# Updates

Below you will find all the different steps in reducing the code to just display the WidgetNews:

- Deleted all unnecessary components
- Displaying Widgetnews in the index file
- Reduced code for the fetchData function
- Reduced code for the newsUrl function located in the library/apiEndPoints
- Switched from a global state management to useState
- Reduced logic code in the WidgetNews to remove unnecessary code and reduce time and space complexity from functions

# Instructions

> Important: This application can only be run in development due to limitations of newsapi.org, which does not allow to work in production under a free plan.

Save in your local .env file the apiKey that you must obtain from [newsApi](https://newsapi.org/)

To run this application, please add the following command:

`pnpm install`
`pnpm run dev`

# Main stack:

- Frontend: Next.js, Tailwind CSS
- Data Fetching: SWR
- Package Manager: pnpm
- Linting: ESLint
