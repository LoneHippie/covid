
(async function getAPI(){

    const getData = async() => {
        let upData; //will be the return value later
            try {
                upData = fetch('https://who-covid-19-data.p.rapidapi.com/api/data', {
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        "x-rapidapi-key": "b307b1be5fmshb9bd262101e5c77p1740f9jsn1ad67ac7acf6"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return data; //promise for upData
                })
                .catch(error => {
                    console.log(error);
                });
            } catch (err) {
                console.log(err);
            }
        return upData; //result of API call
    };

    countryData = await getData(); //countryData = raw data of all countries from API call

    const countryIndex = new Map([
        [1, countryData[0]], //china
        [2, countryData[3]], //australia
        [3, countryData[7]], //japan
        [4, countryData[14]], //italy
        [5, countryData[16]], //UK
        [6, countryData[17]], //spain
        [7, countryData[18]], //switzerland
        [8, countryData[19]], //germany
        [9, countryData[20]], //austria
        [10, countryData[21]], //turkey
        [11, countryData[23]], //israel
        [12, countryData[24]], //russia
        [13, countryData[27]], //sweden
        [14, countryData[28]], //romania
        [15, countryData[66]], //india
        [16, countryData[69]], //france
        [17, countryData[84]], //poland
        [18, countryData[87]], //iran
        [19, countryData[157]] //usa
    ]);

    //logs every obj in map
    /*
    for (const value of countryIndex) {
        console.log(`Country: ${value[0]} -`);
        console.log(value[1]);
    };
    */

    const fillTable = function() {
        let str, newStr;

        str = countryIndex.get(1).reportDate;
        newStr = str.slice(0, 10);

        document.getElementById('disc-date').textContent = newStr;

        for (i = 1; i <= countryIndex.size; i++) {
            let caseRateAdj, caseRateBase, lethality, activeState;

            caseRateBase = countryIndex.get(i).cases / countryIndex.get(i).deaths;
            caseRateAdj = 99.052; //ave of all countries case/death with over 10,000/mil testing

            lethality = (countryIndex.get(i).deaths / (countryIndex.get(i).deaths * caseRateBase)).toFixed(3);

            countryIndex.get(i).daysSinceLastCase > 0 ? activeState = 'No' : activeState = 'Yes';

            document.getElementById('country-' + i).textContent = countryIndex.get(i).name;
            document.getElementById('cases-' + i).textContent = countryIndex.get(i).cases;
            document.getElementById('deaths-' + i).textContent = countryIndex.get(i).deaths;
            document.getElementById('lethality-' + i).textContent = `${lethality}%`;
            document.getElementById('days-since-' + i).textContent = activeState;
                    
        };        
    };
    fillTable();

    document.getElementById('btn-scroll').addEventListener('click', function() { //smooth scroll down to table
        setTimeout(() => {
            document.querySelector('.table-title').scrollIntoView({block: "start", behavior: "smooth"});
        }, 150);
    });

})();










