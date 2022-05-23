import { lazy, Suspense } from "react";
// import SuggestItem from "./SuggestionItem";

export default function SuggestionList({ data, handleClick }) {
  const SuggestItem = lazy(() => import("./SuggestionItem"));

  const suggestions = data.map((item, i) => (
    <Suspense
      key={i}
      fallback={
        <div className=" animate-pulse flex justify-center items-center md:rounded-xl border-gray-700 md:border-2 border-b-2 duration-100 h-[7rem] md:h-[12rem]  md:p-2 font-bold text-lg md:text-xl md:mb-1 ">
          loading
        </div>
      }
    >
      <SuggestItem data={item} key={item.id} handleClick={handleClick} />
    </Suspense>
  ));

  return <>{suggestions}</>;
}
