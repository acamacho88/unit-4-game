$(document).ready(function () {
    var characters = {
        "grievous": {
            "Name": "General Grievous",
            "HealthPoints": 120,
            "AttackPower": 10,
            "CAPower": 7,
            "CurrHP": 120,
            "CurrAPower": 10
        },
        "ackbar": {
            "Name": "Admiral Ackbar",
            "HealthPoints": 80,
            "AttackPower": 8,
            "CAPower": 3,
            "CurrHP": 80,
            "CurrAPower": 8
        },
        "bobafett": {
            "Name": "Boba Fett",
            "HealthPoints": 110,
            "AttackPower": 8,
            "CAPower": 7,
            "CurrHP": 110,
            "CurrAPower": 8
        },
        "windu": {
            "Name": "Mace Windu",
            "HealthPoints": 140,
            "AttackPower": 12,
            "CAPower": 10,
            "CurrHP": 140,
            "CurrAPower": 12
        }
    };

    var currCharacter = '';

    var enemyCharacter = '';

    var numEnemies = Object.keys(characters).length - 1;

    $('#restart').hide()

    $('.characterCard').on("click", function () {
        if (currCharacter.length == 0 && enemyCharacter.length == 0) {
            currCharacter = this.id;
            $('#' + currCharacter).addClass('mainCharacter');
            Object.keys(characters).forEach(element => {
                if (element != currCharacter) {
                    $('#' + element).addClass('enemies');
                }
            })
            $('#yourCharacter').append(this);
            Object.keys(characters).forEach(element => {
                if (element !== currCharacter) {
                    $('#enemiesAvailable').append($('#' + element));
                }
            })
            $('#introHeader').hide();
        } else if (currCharacter.length > 0 && enemyCharacter.length == 0 && this.id !== currCharacter) {
            enemyCharacter = this.id;
            $('#' + enemyCharacter).addClass('enemy');
            $('#defender').append(this);
        }
    })

    var attackIncrement = function () {
        characters[currCharacter]["CurrHP"] -= characters[enemyCharacter]["CAPower"];
        characters[enemyCharacter]["CurrHP"] -= characters[currCharacter]["CurrAPower"];
        characters[currCharacter]["CurrAPower"] += characters[currCharacter]["AttackPower"];
        redrawCard(currCharacter);
        redrawCard(enemyCharacter);
        if (characters[enemyCharacter]["CurrHP"] <= 0 && characters[currCharacter]["CurrHP"] > 0 && numEnemies > 1) {
            $('#statusMsg').text("You have defeated " + characters[enemyCharacter]["Name"] + ", you can choose to fight another enemy.");
            numEnemies -= 1;
            $('#' + enemyCharacter).hide();
            enemyCharacter = '';
        } else if (characters[enemyCharacter]["CurrHP"] <= 0 && numEnemies == 1) {
            $('#statusMsg').text("You have conquered all of your enemies!");
            $('#' + enemyCharacter).hide();
            $('#restart').show();
        } else if (characters[currCharacter]["CurrHP"] <= 0) {
            $('#statusMsg').text('You have been killed! Press Restart to try again. I mean, to do or do not again.');
            $('#restart').show();
        }
    }

    var redrawCard = function (character) {
        $('#' + character + " .hitPoints").text(characters[character]["CurrHP"]);

        // $('#' + enemyCharacter + " .hitPoints").text(characters[enemyCharacter]["CurrHP"]);
    }

    $('#attack').on("click", function () {
        if (characters[currCharacter]["CurrHP"] > 0 && characters[enemyCharacter]["CurrHP"] > 0) {
            attackIncrement();
        }
    })

    $('#restart').on("click", function () {
        Object.keys(characters).forEach(element => {
            characters[element]["CurrHP"] = characters[element]["HealthPoints"];
            characters[element]["CurrAPower"] = characters[element]["AttackPower"];
            redrawCard(element);
            $('#' + element).show();
            $('#' + element).attr('class', 'characterCard');
            $('#characterList').append($('#' + element));
        });
        currCharacter = '';
        enemyCharacter = '';
        numEnemies = Object.keys(characters).length - 1;
        $('#restart').hide();
    })
})