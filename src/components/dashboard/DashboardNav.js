import { StackNavigator } from "react-navigation";
import Dashboard from "./Dashboard";
import SetGoal from "../goals/SetGoal";
import ViewGoals from "../goals/ViewGoals";

const DashboardNav = StackNavigator(
  {
    Dashboard: {
      screen: Dashboard
    },
    SetGoal: {
      screen: SetGoal
    },
    ViewGoals: {
      screen: ViewGoals
    },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  }
);

export default DashboardNav;