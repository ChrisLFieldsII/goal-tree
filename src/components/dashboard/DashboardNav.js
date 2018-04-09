import { StackNavigator } from "react-navigation";
import Dashboard from "./Dashboard";
import SetGoal from "../goals/SetGoal";
import ViewGoals from "../goals/ViewGoals";
import GoalViewer from "../goals/GoalViewer";

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
    GoalViewer: {
      screen: GoalViewer
    },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  }
);

export default DashboardNav;