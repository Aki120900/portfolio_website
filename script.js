document.addEventListener('DOMContentLoaded', function() {
    const skillsData = [
        { skill: "JavaScript", level: 90 },
        { skill: "HTML", level: 80 },
        { skill: "CSS", level: 85 },
        { skill: "Python", level: 70 }
    ];

    const width = 600, height = 600, innerRadius = 100, outerRadius = Math.min(width, height) / 2 - 10;
    const svg = d3.select("#radialBarChart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const xScale = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0)
        .domain(skillsData.map(d => d.skill));

    const yScale = d3.scaleRadial()
        .range([innerRadius, outerRadius])
        .domain([0, 100]);

    const arcs = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(d => yScale(d.level))
        .startAngle(d => xScale(d.skill))
        .endAngle(d => xScale(d.skill) + xScale.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius);

    // Draw the arcs
    const path = svg.append("g")
        .selectAll("path")
        .data(skillsData)
        .enter().append("path")
        .attr("fill", "#4e79a7")
        .attr("d", arcs)
        .each(function(d) { this._current = d; }); // store the initial angles

    // Add interactivity
    path.on("click", function(event, d) {
        const color = d3.select(this).attr("fill") === "#4e79a7" ? "#ff7f0e" : "#4e79a7";
        d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", color);
    });

    // Add text labels
    svg.append("g")
        .selectAll("text")
        .data(skillsData)
        .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => {
            const angle = xScale(d.skill) + xScale.bandwidth() / 2 - Math.PI / 2;
            const radius = yScale(d.level) + 30; // Adjust this value to position the text
            return `translate(${Math.cos(angle) * radius}, ${Math.sin(angle) * radius})`;
        })
        .text(d => `${d.skill} (${d.level}%)`)
        .style("fill", "white")
        .style("font-size", "12px");
});




document.addEventListener('DOMContentLoaded', function() {
    const bubbles = document.querySelectorAll('.skill-bubble');
    const totalHeight = window.innerHeight; // Full height of the viewport
    const bubbleHeight = 50; // Approximate height for each bubble
    const spacing = 20; // Space between bubbles
    const numberOfColumns = 3; // Number of columns for the bubbles
    const columnWidth = 150; // Width of each column

    let columns = Array.from({ length: numberOfColumns }, () => 20); // Starting y-position for each column

    bubbles.forEach((bubble, index) => {
        const columnIndex = index % numberOfColumns; // Determine which column to place the bubble
        bubble.style.position = 'absolute';
        bubble.style.left = `${20 + columnIndex * (columnWidth + spacing)}px`; // Position based on column index
        bubble.style.top = `${columns[columnIndex]}px`; // Set the top based on the current column's last top value

        columns[columnIndex] += bubble.clientHeight + spacing; // Increment the top for the next bubble in this column

        // Ensure that the bubbles don't overlap with the chart when resizing or changing orientation
        window.addEventListener('resize', function() {
            if (window.innerWidth / 2 < 20 + bubble.offsetWidth) {
                bubble.style.visibility = 'hidden'; // Hide bubble if it overlaps with the chart
            } else {
                bubble.style.visibility = 'visible';
            }
        });

        // Apply subtle floating animation within their own space
        anime({
            targets: bubble,
            translateX: function() {
                return anime.random(-5, 5);
            },
            easing: 'easeInOutSine',
            duration: 8000,
            loop: true,
            direction: 'alternate'
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-gallery img, .project-item img');
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    modalContent.appendChild(closeButton);

    const imgElement = document.createElement('img');
    modalContent.appendChild(imgElement);

    document.body.appendChild(modal);

    images.forEach(image => {
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', function() {
            imgElement.src = this.src;
            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
