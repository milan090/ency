import create from "zustand";
import { TabName } from "types/dahboard-home.types";

type UseDashboardTabs = {
  activeTab: TabName;
  setTabName: (tabName: TabName) => void;
};

export const useDashboardHomeTabs = create<UseDashboardTabs>((set) => ({
  activeTab: "all",
  setTabName: (tabName) => set(() => ({ activeTab: tabName })),
}));
