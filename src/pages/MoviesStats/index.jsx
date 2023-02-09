import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import "assets/styles/moviesstats.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTopMovies } from "store/actions/movieActions";

const MoviesStats = () => {
  const svgRef = useRef();
  const svgRef2 = useRef();
  const { topRatedMovies } = useSelector((state) => state.moviesState);
  const dispatch = useDispatch();

  const getTopTenMovies = (isCount) => {
    return (topRatedMovies?.slice(0, 10) || []).map((item) => ({
      name: item.title,
      value: isCount ? item.vote_count : item.vote_average,
    }));
  };

  const getSvgWidth = () => {
    return parseInt(
      window.innerWidth * (window.innerWidth > 600 ? 0.3 : 0) +
        (window.innerWidth > 600 ? 200 : 120)
    );
  };

  const populateChart = (ref, isCount) => {
    const data = getTopTenMovies(isCount);
    const margin = { top: 50, right: 30, bottom: 150, left: 40 },
      width = window.innerWidth - getSvgWidth(),
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom + 150)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map((d) => {
          return d.name;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("fill", "#ffffff")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#ffffff")
      .style("font-size", "12px")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "#ffffff")
      .style("font-size", "15px");

    //X-axis & Y-axis path and line colors
    svg.selectAll("path").attr("stroke", "#ffffff");
    svg.selectAll("line").attr("stroke", "#ffffff");

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => {
        return x(d.name);
      })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", () => {
        return height - y(0);
      }) // always equal to 0
      .attr("y", () => {
        return y(0);
      });

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d) => {
        return y(d.value);
      })
      .attr("height", (d) => {
        return height - y(d.value);
      })
      .delay((_, i) => {
        return i * 100;
      });
  };

  useEffect(() => {
    if (!topRatedMovies) {
      return dispatch(getTopMovies());
    }
    populateChart(svgRef);
    populateChart(svgRef2, true);
  }, [topRatedMovies]);

  return (
    <div className="stats-container">
      <div className="container__fluid">
        <div className="container__fluid__title-sec">
          <h3>
            Top 10 Highest <span>Rated Movies</span>
          </h3>
        </div>
        <svg ref={svgRef}>{/* bars will be drawn here */}</svg>
        <div className="container__fluid__title-sec">
          <h3>
            <span>Vote Count For</span> Top 10 Highest <span>Rated Movies</span>
          </h3>
        </div>
        <svg ref={svgRef2}>{/* bars will be drawn here */}</svg>
      </div>
    </div>
  );
};

export default MoviesStats;
