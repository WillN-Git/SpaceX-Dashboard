# SpaceX Dashboard

[1]: https://b0p6g4.csb.app/
[2]: https://github.com/WillN-Git/SpaceX-Dashboard/blob/main/MDImages/spaceX-dashboard-shorts.gif?raw=true
[![SpaceX Dashboard][2]][1]

## Project Purpose

This project aims to display data from the SpaceX [API](https://github.com/r-spacex/SpaceX-API) in an accessible, informative and interactive format.

Own Objectives: 

- Learn to code in collaboration.
- Make something with my data visualization's skills.
- Improve my skills in React

## User Experience Design

#### Strategy

Site Objectives:

- Present SpaceX's launch data in an intuitive and fun way.
- Promote interest in SpaceX's activities.

User Needs:

The target audience is SpaceX and space enthusiasts. Users should be able to:

- Interact with SpaceX's launch and payload data.
- See images, external video links relating to each launch.
- Find out about future launch details.
- See location of launch pads.

| Opportunity/Problem                           | Importance     | Viability/Feasibility  |
| --------------------------------------------- |:--------------:|:-----------------------:|
| A. Display launch data to the user| 5 | 5 |
| B. Allow interactive filtering of data        | 5 | 5 |
| C. Display underlying filtered data in a table| 4 | 5 |
| D. Promote interest in SpaceX's future activities | 3 | 3 |

## Technologies Used

- [CSS3](https://www.w3.org/Style/CSS/Overview.en.html) : used for styling all the components of the page.
- [React](https://reactjs.org/docs/introducing-jsx.html) : used for programming with a component logic, and make it easier to maintain/debug my code.
- [ChartJS](https://react-chartjs-2.js.org/) : a very useful framework to draw common graphs.
- [react-leaflet](https://react-leaflet.js.org/) : used for displaying launchpad's location in map.
- [VSCode](https://code.visualstudio.com) : preferred code editor for web app.
- [W3C Validator](https://jigsaw.w3.org) : used to validate HTML & CSS.

## Testing

Extensive manual testing was conducted to ensure the site functions and looks well on all major browsers (Chrome, Firefox, Safari, Edge) and device sizes.

The following manual tests passed:

| Test No. | Test Name | Result |
|:-|:-|:-|
|1|Launch dashboard can be filtered and unfiltered on graph segment click|PASS|
|2|Any filter applied within a dashboard group updates all other graphs in that dashboard group (ie in Launches or Payloads groups)|PASS|
|3|No excessive amounts of text|PASS|
|4|All navigation links smooth scroll to correct section|PASS|
|5|All text is readable and appropriate size|PASS|
|6|All external links work and open in new tabs (target="_blank")|PASS|
|7|Add Launch to Calendar button fires with correct parameters|PASS|
|8|Page and graphs do not take excessive time to load and render|PASS|


The following tests failed:

| Test No. | Test Name | Result | Issue |
|:-|:-|:-|:-|
|1|All charts are appropriately sized for each device (Mobile, Tablet)|FAIL| On mobile devices, table overflow maximum width size|
|2|Correct display of content|FAIL| The range of the graph of launch results, is display outside its container|

## Deployment

The site was deployed automatically on [codesandbox](https://codesandbox.io)

## Credits

### Content

The underlying data for all charts is sourced from the SpaceX API, using the following endpoints:

- Launches: https://api.spacexdata.com/v4/launches
- Landing Pads: https://api.spacexdata.com/v4/landpads
- Rockets: https://api.spacexdata.com/v4/rockets

### Acknowledgements

Thanks to [Ryan Tankeng](https://github.com/MrRyanWise), for his help during the development. Also, thanks to friends for helping with the UX testing.
