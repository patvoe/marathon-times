// Load the data with d3.csv()
d3.csv("./assets/simulation-d3.csv").then((data) => {
  const margin = { top: 30, right: 20, bottom: 20, left: 101 };
  const height = 360 - margin.top - margin.bottom;

  // Get the parent container's width
  const containerWidth = d3
    .select("#chart")
    .node()
    .getBoundingClientRect().width;
  const width = containerWidth - margin.left - margin.right;

  // Create an SVG container inside #chart using d3.select().append()
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Append two horizontal background rectangles
  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0) // Set the y-position for the first rectangle
    .attr("width", width)
    .attr("height", 117) // Set the height for the first rectangle
    .attr("fill", "#E4EFF4");

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 121) // Set the y-position for the second rectangle
    .attr("width", width)
    .attr("height", 123) // Set the height for the second rectangle
    .attr("fill", "#F4E9F4");

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 248) // Set the y-position for the second rectangle
    .attr("width", width)
    .attr("height", 61) // Set the height for the second rectangle
    .attr("fill", "#F4F4F4");

  // Define a circular clipPath
  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "circleClip")
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 10)
    .attr("r", 10);

  // Convert time to seconds
  data.forEach((d) => {
    const parts = d.time.split(":");
    d.total_seconds = +parts[0] * 3600 + +parts[1] * 60 + +parts[2];
    d.speed = 42195 / d.total_seconds;
  });

  const years = data.map((d) => d.year); // Extract only the years
  const uniqueYears = Array.from(new Set(years)); // Ensure unique years
  const maxTime = d3.max(data, (d) => d.total_seconds);
  const times = d3.range(0, maxTime + 1);

  const x = d3.scaleLinear().domain([0, 42195]).range([0, width]);

  const y = d3.scaleBand().domain(uniqueYears).range([0, height]).padding(0.1);

  const xAxis = d3.axisBottom(x).ticks(5).tickSize(-height); // Specify 5 ticks on the x-axis
  const yAxis = d3.axisLeft(y).tickSize(0);

  svg
    .append("g")
    .attr("class", "axis x grid")
    .call(
      xAxis.tickFormat((d, i, nodes) => {
        const formattedNumber = d3.format(",")(d); // Format the number with commas

        // Check if it's the last tick
        if (i === nodes.length - 1) {
          return formattedNumber + " m";
        }
        return formattedNumber;
      })
    )
    .attr("transform", `translate(0, ${height})`);

  // Remove y-axis and x-axis tick lines and domain
  svg.selectAll(".domain").remove();

  svg
    .append("g")
    .attr("class", "axis y grid")
    .call(yAxis)
    .selectAll("text")
    .each(function (d) {
      const parts = d.split(" ");
      d3.select(this).text(null); // Clear existing text

      if (parts.length === 3) {
        // Handling more than three parts
        const firstLine = parts.slice(0, 1).join(" ");
        const secondLine = parts.slice(1, 3).join(" ");
        const thirdLine = parts.slice(3).join(" ");
        d3.select(this)
          .append("tspan")
          .attr("x", -25)
          .attr("dy", "-0.4em") // Start from the current position
          .style("font-weight", "bold")
          .text(firstLine);
        d3.select(this)
          .append("tspan")
          .attr("x", -25)
          .attr("dy", "1.3em")
          .text(secondLine);
        d3.select(this)
          .append("tspan")
          .attr("x", -25)
          .attr("dy", "1.2em")
          .text(thirdLine);
      } else if (parts.length === 4) {
        // Handling exactly three parts
        const firstLine = parts.slice(0, 2).join(" ");
        const secondLine = parts.slice(2, 3).join(" ");
        const thirdLine = parts.slice(3).join(" ");
        d3.select(this)
          .append("tspan")
          .attr("x", -25)
          .attr("dy", "-1em") // Start from the current position
          .style("font-weight", "bold")
          .text(firstLine);
        d3.select(this)
          .append("tspan")
          .attr("x", -25)
          .attr("dy", "1.3em")
          .text(secondLine);
        d3.select(this)
          .append("tspan")
          .attr("x", -25)
          .attr("dy", "1.3em")
          .text(thirdLine);
      } else {
        // Handling single line
        d3.select(this)
          .append("tspan")
          .style("font-weight", "bold")
          .attr("x", -25)
          .attr("dy", "0.35em")
          .text(d);
      }
    });

  svg
    .selectAll(".axis.x.grid text") // This selects all text elements within the group with class "axis x grid"
    .attr("dy", "1.25em"); // Move the text down

  const bars = svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", (d) => y(d.year))
    .attr("height", y.bandwidth())
    .attr("width", 0)
    .attr("fill-opacity", 0); // Set fill-opacity to 0 for transparency

  // Append the finish line before the icons
  svg
    .append("line")
    .attr("class", "finish-line")
    .attr("x1", x(42195))
    .attr("x2", x(42195))
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "#121212")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5,5");

  // Append the "FINISH" label centered over the finish line
  svg
    .append("text")
    .attr("class", "finish-label")
    .attr("x", x(42195))
    .attr("y", -10) // Adjust this value to position the label above the chart
    .attr("text-anchor", "middle")
    .text("FINISH");

  // Append the vertical line at x=0
  svg
    .append("line")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  // Create a group for each icon with a circular mask
  const icons = svg
    .selectAll(".icon")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "icon")
    .attr(
      "transform",
      (d) => `translate(-10, ${y(d.year) + y.bandwidth() / 2 - 10})`
    );

  // Add the circular background for the icons
  icons
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 10)
    .attr("r", 10)
    .style("fill", "none")
    .style("stroke", "#ffffff")
    .style("stroke-width", "1px")
    .style("box-shadow", "rgba(149, 157, 165, 0.2) 0px 8px 24px");

  // Add the icons
  icons
    .append("image")
    .attr("xlink:href", (d) => {
      if (d.country === "user") {
        return "./assets/runner-user.svg";
      } else if (d.country === "men") {
        return "./assets/runner-m.svg";
      } else if (d.country === "menOld") {
        return "./assets/runner-m-alt.svg";
      } else if (d.country === "woman") {
        return "./assets/runner-f.svg";
      } else if (d.country === "womanOld") {
        return "./assets/runner-f-alt.svg";
      } else {
        return `https://interaktiv.tagesanzeiger.ch/static/flags-world/1x1/${d.country.toLowerCase()}.svg`;
      }
    })
    .attr("width", 20)
    .attr("height", 20)
    .attr("clip-path", "url(#circleClip)");

  // Append the name labels after the y-axis grid to ensure they are on top
  const nameLabels = svg
    .selectAll(".name-label")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "name-label")
    .attr("data-runner-id", (d) => d.id)
    .attr(
      "transform",
      (d) =>
        `translate(${x(42195) + 10}, ${y(d.year) + y.bandwidth() / 2 - 10})`
    )
    .style("display", "none");

  // Add text for the white stroke
  nameLabels
    .append("text")
    .attr("class", "name-stroke")
    .attr("x", -30)
    .attr("dy", "0.3em")
    .attr("text-anchor", "end")
    .style("stroke", "white")
    .style("stroke-width", "4px") // Increased stroke width for thicker contour
    .style("fill", "none")
    .text((d) => `${d.who}, ${d.countryIso}`);

  nameLabels
    .append("text")
    .attr("class", "time-or-meters-stroke")
    .attr("x", -30)
    .attr("dy", "1.9em")
    .attr("text-anchor", "end")
    .style("stroke", "white")
    .style("stroke-width", "4px") // Increased stroke width for thicker contour
    .style("fill", "none")
    .text((d) => d.info);

  // Add text for the black fill
  nameLabels
    .append("text")
    .attr("class", "name")
    .attr("x", -30)
    .attr("dy", "0.3em")
    .attr("text-anchor", "end")
    .style("fill", "black")
    .text((d) => `${d.who}, ${d.countryIso}`);

  // nameLabels
  // .each(function(d) {
  //     if (d.countryIsoTwo) {
  //         d3.select(this)
  //             .append("image")
  //             .attr("class", "flag")
  //             .attr("x", -50)  // Adjust the x position as needed
  //             .attr("y", -10)  // Adjust the y position as needed
  //             .attr("width", 20)  // Adjust the width as needed
  //             .attr("height", 20)  // Adjust the height as needed
  //             .attr("xlink:href", `https://interaktiv.tagesanzeiger.ch/static/flags-world/4x3/${d.countryIsoTwo.toLowerCase()}.svg`);
  //     }
  // });

  nameLabels
    .append("text")
    .attr("class", "time-or-meters")
    .attr("x", -30)
    .attr("dy", "1.9em")
    .attr("text-anchor", "end")
    .style("fill", "black")
    .text((d) => d.info);

  nameLabels
    .append("text")
    .attr("class", "third-meters")
    .attr("x", -30)
    .attr("dy", "2.4em")
    .attr("text-anchor", "end")
    .style("fill", "black");

  let running = false;
  let currentTime = 0;
  const simulationDuration = 1200; // simulation duration in seconds
  const realToSimRatio = simulationDuration / maxTime; // Ratio of real-world time to simulation time

  let firstPersonFinishedM = false;
  let firstPersonFinishTimeM = 0;
  let firstPersonFinishedF = false;
  let firstPersonFinishTimeF = 0;

  // function formatTime(seconds) {
  //   const h = Math.floor(seconds / 3600)
  //     .toString()
  //     .padStart(2, "0");
  //   const m = Math.floor((seconds % 3600) / 60)
  //     .toString()
  //     .padStart(2, "0");
  //   const s = Math.floor(seconds % 60)
  //     .toString()
  //     .padStart(2, "0");
  //   return `${h}:${m}:${s}`;
  // }

  function checkFinishers() {
    data.forEach((d) => {
      const realTime = currentTime / realToSimRatio;
      const distance = Math.min(d.speed * realTime, 42195);

      // These are the corrected sections
      if (!firstPersonFinishedM && d.gender === "m" && distance >= 42195) {
        firstPersonFinishedM = true;
        firstPersonFinishTimeM = d.total_seconds;
        console.log(`First male finisher: ${d.who}`);

        // Show all name-labels for male runners
        svg
          .selectAll(".name-label")
          .filter((runner) => runner.gender === "m")
          .style("display", "block");
      }

      if (!firstPersonFinishedF && d.gender === "f" && distance >= 42195) {
        firstPersonFinishedF = true;
        firstPersonFinishTimeF = d.total_seconds;
        console.log(`First female finisher: ${d.who}`);

        // Show all name-labels for female runners
        svg
          .selectAll(".name-label")
          .filter((runner) => runner.gender === "f")
          .style("display", "block");
      }
      // End of the corrected sections
    });
  }

  // function updateLabels() {
  //   data.forEach((d) => {
  //     const realTime = currentTime / realToSimRatio;
  //     const distance = Math.min(d.speed * realTime, 42195);

  //     if (distance >= 42195) {
  //       // Assuming 'd.label' is the selection of label for participant 'd'
  //       d.label.text(
  //         `Finished: ${formatTime(d.total_seconds)} | Distance: 42.195 km`
  //       );
  //     } else {
  //       d.label.text(
  //         `Running: ${formatTime(realTime)} | Distance: ${distance.toFixed(
  //           2
  //         )} km`
  //       );
  //     }
  //   });
  // }

  function updateBarsAndIcons() {
    bars.attr("width", (d) => {
      const realTime = currentTime / realToSimRatio;
      let distance;
      if (d.gender === "m" && firstPersonFinishedM) {
        distance = Math.min(d.speed * firstPersonFinishTimeM, 42195);
      } else if (d.gender === "f" && firstPersonFinishedF) {
        distance = Math.min(d.speed * firstPersonFinishTimeF, 42195);
      } else {
        distance = Math.min(d.speed * realTime, 42195);
      }

      return x(distance);
    });

    icons.attr("transform", (d) => {
      const realTime = currentTime / realToSimRatio;
      let distance;

      if (firstPersonFinishedM && d.gender === "m") {
        distance = Math.min(d.speed * firstPersonFinishTimeM, 42195);
      } else if (firstPersonFinishedF && d.gender === "f") {
        distance = Math.min(d.speed * firstPersonFinishTimeF, 42195);
      } else {
        distance = Math.min(d.speed * realTime, 42195);
      }

      return `translate(${x(distance) - 10}, ${
        y(d.year) + y.bandwidth() / 2 - 10
      })`;
    });

    nameLabels.attr("transform", (d) => {
      const realTime = currentTime / realToSimRatio;
      let distance;

      if (firstPersonFinishedM && d.gender === "m") {
        distance = Math.min(d.speed * firstPersonFinishTimeM, 42195);
      } else if (firstPersonFinishedF && d.gender === "f") {
        distance = Math.min(d.speed * firstPersonFinishTimeF, 42195);
      } else {
        distance = Math.min(d.speed * realTime, 42195);
      }

      return `translate(${x(distance) + 10}, ${
        y(d.year) + y.bandwidth() / 2 - 10
      })`;
    });
  }

  function update() {
    currentTime += 1; // Incrementing in simulation time steps

    checkFinishers();
    updateBarsAndIcons();

    // Check if the simulation is finished
    if (firstPersonFinishedM && firstPersonFinishedF) {
      clearInterval(interval); // Stop the animation
      d3.select("#start-pause-restart").text("Restart"); // Change the button text to "Reload"
      running = false;
    }
  }

  function reset() {
    currentTime = 0;
    firstPersonFinishedM = false;
    firstPersonFinishTimeM = 0;
    firstPersonFinishedF = false;
    firstPersonFinishTimeF = 0;
    console.log("Reset simulation");

    bars.attr("width", 0);
    icons.attr(
      "transform",
      (d) => `translate(-10, ${y(d.year) + y.bandwidth() / 2 - 10})`
    );
    nameLabels.style("display", "none");
    nameLabels.selectAll(".time-or-meters").text((d) => d.info); // Update the text content
    nameLabels.selectAll(".time-or-meters-stroke").text((d) => d.info); // Update the text content
    nameLabels.selectAll(".third-meters").text(""); // Clear the text content
  }

  let interval;

  d3.select("#start-pause-restart").on("click", function () {
    if (d3.select(this).text() === "Restart") {
      reset(); // Reset the state if the simulation has finished
      d3.select(this).text("Start"); // Change the button text to "Start"
      running = false; // Ensure running is set to false
    } else if (running) {
      clearInterval(interval);
      d3.select(this).text("Start");
      running = false;
    } else {
      if (firstPersonFinishedM || firstPersonFinishedF) {
        reset(); // Reset the state if the simulation has finished
        firstPersonFinishedM = false;
        firstPersonFinishedF = false;
      }
      interval = setInterval(update, 1); // Start the animation
      d3.select(this).text("Pause");
      running = true;
    }
  });

  // Resize the chart on window resize
  window.addEventListener("resize", () => {
    const containerWidth = d3
      .select("#chart")
      .node()
      .getBoundingClientRect().width;
    const width = containerWidth - margin.left - margin.right;
    x.range([0, width]);
    svg.attr("width", containerWidth);

    // Update elements that depend on width
    svg.select(".axis.x.grid").call(xAxis);
    updateBarsAndIcons();
  });
});
