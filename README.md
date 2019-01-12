# AmEx-takehome
* Web Application that allows users to search for and view books using Open Library's API.
* [Deployed Link](book-finder-a42054.netlify.com)
* ```npm run start:dev```
* ```npm run test:client```
## Design Decisions
* Paginate Response from API (vs. Infinite Scrolling)
    * Infinite scrolling is less accessible; if results are paginated, sr-users have a better idea of where they are.
    * Pagination allows users to skip many pages at once if they know what they're looking for.
    * Applying filters in the middle of an infinite scroll would be more expensive for the DOM to rerender.
* Client-Side Filtering (vs. Server-Side filtering)
    * Minimizes request-response cycles, improving usability for users with intermittent internet connection.
    * Filters are dynamically generated based upon results in the redux store, enabling filtering by every property on every book returned.
    * Enables multi-select filters that canot be done with API end points (filtering by 3 authors, 2 languages, etc.).
    * Sufficiently performant, even when performed on thousands of elements.
* Query Limit of 900 Books per API request (vs. Higher Limit vs. Lazy Loading Small Sections)
    * 900 is enough to remain performant, while sufficiently populating results and filters.
    * User can load more results when they reach the end of their current results; new query results are combined with current results.
    * There is a case where a user's search would return thousands of results, and they would want to filter it down by author or language. In this case, filters would only apply to the results currently in state, rather than the thousands of results. 
    * However, this case seems unlikely to me, given the ability to search by author and title.
    * Loading in all results at once would be unperformant.
    * Lazy loading smaller sections of query results would cause issues for users with poor internet connectivity.
## Developer Features
* Test coverage for utility functions.
* File structure with a divide between reusable components and containers.
    * Constants and utility functions and separated into their own files.
* Ability to add any new filter by simply editing the allowedFilters file in store folder.
## User Features
* Accessible; tested using pa11y and VoiceOver on macOS.
* All page components scale appropriately to device size.
* Handles dropped connections, refreshes, and API server errors.
* Allows a user to search by fields beyond documented API end points.
## Things To Improve Upon
* More comprehensive test coverage, currently learning about writing good tests.
* Make Filter Dropdowns typable multiselect components.
    * If a user without a keyboard knows they want to filter by author J.R.R. Tolkein, they need to hold down arrow until they       get to the J’s, rather than being able to type 'J' and jump to the appropriate portion of filter options.
* Store parts of redux state in cache to further improve experience for users with an intermittent internet connection.
