import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProjectPage } from "@prisma/client";
import { IFirebaseUser } from "src/auth/interfaces/user.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectPageDto } from "./dto/create-project-page.dto";
import { UpdateProjectPageDto } from "./dto/update-project-page.dto";
import {
  ProjectPageEntity,
  ProjectPageEntityNoData,
} from "./enitiies/projectPage.entity";

@Injectable()
export class ProjectPageService {
  constructor(private prisma: PrismaService) {}

  create(
    user: IFirebaseUser,
    createProjectPageDto: CreateProjectPageDto,
  ): Promise<ProjectPageEntity> {
    return this.prisma.projectPage.create({
      data: {
        name: "Untitled Page",
        data: "",
        project: {
          connect: {
            // Only the owner can add
            id_userUid: {
              id: createProjectPageDto.projectId,
              userUid: user.uid,
            },
          },
        },
      },
    });
  }

  findAll(
    user: IFirebaseUser,
    projectId: number,
  ): Promise<ProjectPageEntityNoData[]> {
    return this.prisma.projectPage.findMany({
      where: {
        project: {
          id: projectId,
          OR: [
            // Either thr project isPublic or is owned by the user
            {
              isPublic: true,
            },
            {
              userUid: user.uid,
            },
          ],
        },
      },
      select: {
        // Deselecting data
        id: true,
        name: true,
        projectId: true,
        data: false,
      },
    });
  }

  async findOne(
    user: IFirebaseUser,
    pageId: number,
  ): Promise<ProjectPageEntity> {
    const projectPage = await this.prisma.projectPage.findFirst({
      where: {
        id: pageId,
        OR: [
          // Either project isPublic or owned by the authorized user
          {
            project: {
              isPublic: true,
            },
          },
          {
            project: {
              userUid: user.uid,
            },
          },
        ],
      },
    });

    if (!projectPage) {
      throw new NotFoundException("Project with given id not found");
    }

    return projectPage;
  }

  async update(
    user: IFirebaseUser,
    pageId: number,
    updateProjectPageDto: UpdateProjectPageDto,
  ): Promise<ProjectPageEntity> {
    const projectPage = await this.prisma.projectPage.findUnique({
      where: {
        id: pageId,
      },
      select: {
        project: true,
      },
    });

    if (!projectPage)
      throw new NotFoundException("Page with given id does not exist");

    if (projectPage?.project.userUid === user.uid)
      throw new BadRequestException(
        "You are not authorized to perform this action",
      );

    return this.prisma.projectPage.update({
      where: {
        id: pageId,
      },
      data: {
        ...updateProjectPageDto,
      },
    });
  }

  async remove(
    user: IFirebaseUser,
    pageId: number,
  ): Promise<ProjectPageEntity> {
    const projectPage = await this.prisma.projectPage.findUnique({
      where: {
        id: pageId,
      },
      select: {
        project: true,
      },
    });

    if (!projectPage)
      throw new NotFoundException("Page with given id does not exist");

    if (projectPage?.project.userUid === user.uid)
      throw new BadRequestException(
        "You are not authorized to perform this action",
      );

    return this.prisma.projectPage.delete({
      where: {
        id: pageId,
      },
    });
  }
}
