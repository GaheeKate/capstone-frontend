import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const resultsAdapter = createEntityAdapter({});

const initialState = resultsAdapter.getInitialState();

export const resultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.query({
      query: () => "/results",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedResults = responseData.map((result) => {
          result.id = result._id;
          return result;
        });
        return resultsAdapter.setAll(initialState, loadedResults);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Result", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Result", id })),
          ];
        } else return [{ type: "Result", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetResultsQuery } = resultsApiSlice;

// returns the query result object
export const selectResultsResult =
  resultsApiSlice.endpoints.getResults.select();

// creates memoized selector
const selectResultsData = createSelector(
  selectResultsResult,
  (resultsResult) => resultsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllResults,
  selectById: selectResultById,
  selectIds: selectResultIds,
  // Pass in a selector that returns the results slice of state
} = resultsAdapter.getSelectors(
  (state) => selectResultsData(state) ?? initialState
);
