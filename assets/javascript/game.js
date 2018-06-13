$(document).ready(function () {
    var characters = {
        "grievous": {
            "HealthPoints": 120,
            "AttackPower": 10,
            "CAPower": 7,
            "CurrHP": 120,
            "CurrAPower": 10
        },
        "ackbar": {
            "HealthPoints": 80,
            "AttackPower": 8,
            "CAPower": 3,
            "CurrHP": 80,
            "CurrAPower": 8
        },
        "bobafett": {
            "HealthPoints": 110,
            "AttackPower": 8,
            "CAPower": 7,
            "CurrHP": 110,
            "CurrAPower": 8
        },
        "windu": {
            "HealthPoints": 140,
            "AttackPower": 12,
            "CAPower": 10,
            "CurrHP": 140,
            "CurrAPower": 12
        }
    };

    var currCharacter = '';

    var enemyCharacter = '';

    var numEnemies = characters.length - 1;

    $('#restart').hide()

    $('.characterCard').on("click", function () {
        if (currCharacter.length == 0 && enemyCharacter.length == 0) {
            currCharacter = this.id;
            console.log(currCharacter);
        } else if (currCharacter.length > 0 && enemyCharacter.length == 0) {
            enemyCharacter = this.id;
            console.log(enemyCharacter);
        }
    })

    $('#attack').on("click", function () {
        if (characters[currCharacter]["currHP"] <= 0 || numEnemies == 0) {
            $('#restart').show();
        }
    })

    $('#restart').on("click", function () {
        currCharacter = '';
        enemyCharacter = '';
        numEnemies = characters.length - 1;
    })
})