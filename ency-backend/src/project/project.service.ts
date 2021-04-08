import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { IFirebaseUser } from "src/auth/interfaces/user.interface";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectEntity } from "./enitiies/project.entity";

const FIRST_PAGE_TITLE = "Untitled page 1";

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProjectDto: CreateProjectDto,
    userUid?: string,
  ): Promise<ProjectEntity> {
    if (!userUid) throw new BadRequestException();

    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        user: {
          connect: {
            uid: userUid,
          },
        },
        pages: {
          create: {
            name: FIRST_PAGE_TITLE,
            data: "",
          },
        },
      },
    });

    return {
      ...project,
      pageCount: 1,
    };
  }

  async findAll(
    user: IFirebaseUser,
    userUid: string,
  ): Promise<ProjectEntity[]> {
    const projects = await this.prisma.project.findMany({
      where: {
        userUid,
        OR: [
          // Either Project isPublic or is owned by authorized user
          {
            isPublic: true,
          },
          {
            userUid: user.uid,
          },
        ],
      },
    });

    // ISSUE: Change this to more performant one once this issue is resolved: https://github.com/prisma/prisma/issues/5079
    return Promise.all(
      projects.map(async (project) => {
        const pageCount = await this.findOnePageCount(project.id);
        return {
          ...project,
          pageCount,
        };
      }),
    );
  }

  async findOne(id: number): Promise<ProjectEntity> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project)
      throw new NotFoundException(
        `A Project with the given id: ${id} not found`,
      );

    const pageCount = await this.findOnePageCount(project.id);

    return {
      ...project,
      pageCount,
    };
  }

  async findOnePageCount(projectId: number): Promise<number> {
    return this.prisma.projectPage.count({
      where: {
        projectId: projectId,
      },
    });
  }

  async update(
    userUid: string,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return await this.prisma.project.update({
      where: {
        id_userUid: {
          id: id,
          userUid: userUid,
        },
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  async remove(userUid: string, id: number): Promise<number> {
    // return this.prisma.project.delete({
    //   where: {
    //     id_userUid: {
    //       id: id,
    //       userUid: userUid,
    //     },
    //   },
    // });

    const res = await this.prisma.$executeRaw`
      DELETE FROM project WHERE "userUid" = ${userUid} AND id = ${id}
    `;

    if (res !== 1) {
      throw new NotFoundException("Project with given id not found");
    }

    return res;
  }
}
