var ctx = document.getElementById('myChart2').getContext('2d');
var chart = new Chart(ctx, {
   
    type: 'doughnut',

    data: {
        labels: ["Water", "Vlees", "Groente", "Fruit"],
        datasets: [{
            label: "Voedsel",
            backgroundColor: ['#9400D3', '#CC66FF', '#33CCBC','#05CBE1'],
            borderColor: ['black', 'black', 'black', 'black'],
            data: [40, 35, 20, 33],
        }]
    },

    options: {}
});