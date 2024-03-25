import DailyComponent from "@/Components/DailyComponent";
import SearchComponent from "@/Components/SearchComponent";
import WeeklyComponent from "@/Components/WeeklyComponent";

export default function Home() {
  return (
    <div className="bg-Light min-h-screen pt-12">
      <SearchComponent />
      <DailyComponent />
      <WeeklyComponent />
    </div>
  );
}
