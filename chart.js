function range(num, start) {
    let set = [];
    for(let i = 0; i < num; i++) {
        set.push(i + start);
    }
    return set;
}
var ctx = document.getElementById("chart").getContext('2d');
//var labels = range(skdata.length, 1);
var mychart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Sick people",
            data: [],
            fill: false,
            borderColor: 'rgb(192, 75, 75)',
            tension: 0.1
        },
        {
            label: "Immune people",
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: "Uninfected people",
            data: [],
            fill: false,
            borderColor: 'rgb(75, 75, 192)',
            tension: 0.1
        },
        {
            label: "Dead people",
            data: [],
            fill: false,
            borderColor: 'rgb(75, 75, 75)',
            tension: 0.1
        }]
    }
});
function addData(chart, didx, data) {
    chart.data.datasets[didx].data.push(data);
    chart.update();
}
function addLabel(chart, label) {
    chart.data.labels.push(label);
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}