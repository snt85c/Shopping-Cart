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
          <div className="flex justify-center items-center md:rounded-xl border-gray-700 md:border-2 border-b-2 duration-100 h-[7rem] md:h-[12rem]  md:p-2 font-bold text-lg md:text-xl md:mb-1 ">
            <Spinner />
          </div>
        }
      >
        <SuggestItem data={item} key={item.id} handleClick={handleClick} />
      </Suspense>
    ));

  return <>{suggestions}</>;
}
