import { lazy, Suspense } from "react";
import { Spinner } from "../Services";
import { useSelector } from "react-redux";
export default function SuggestionList({ handleClick }) {
  const data = useSelector((state) => state.reducer.suggestions);
  const SuggestItem = lazy(() => import("./SuggestionItem"));
  let suggestions = data.map((item, i) => (
    <Suspense
      key={i + 1}
      fallback={
        <div
          role="status"
          className="max-w-sm animate-pulse flex flex-col md:rounded-xl border-gray-700 md:border-2 border-b-2  hover:border-4 hover:border-amber-500 duration-100 h-[7rem] md:h-[12rem]  md:p-2 cursor-pointer font-bold text-lg md:text-5xl md:mb-1 p-1"
        >
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-10"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <span className="sr-only">Loading...</span>
        </div>
      }
    >
      <SuggestItem data={item} key={item.id} handleClick={handleClick} />
    </Suspense>
  ));

  return <>{suggestions}</>;
}
