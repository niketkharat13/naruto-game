new Vue({
    el: '#app',
    data: {
        Defeat: 'Defeated',
        naruto_life: 100,
        sasuke_life: 100,
        start_game: false,
        match_begin: false,
        turns: [],
        healthbar_naruto: {
            width: 100 + '%'
        },
        healthbar_sasuke: {
            width: 100 + '%'
        }
    },
    methods: {
        attack: function () {
            this.match_begin = true;
            var d_b_n = this.damageFunction(10);
            this.turns.unshift({
                isPlayer: true,
                text: 'Maruto Hit Sasuke for ' + d_b_n
            });
            this.sasuke_life = this.sasuke_life - d_b_n;
            this.dynamicWidth(this.healthbar_sasuke, this.sasuke_life);
            setTimeout(() => {
                var d_b_s = this.damageFunction(10);
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Sasuke Hit Naruto for ' + d_b_s
                });
                this.naruto_life = this.naruto_life - d_b_s;
                this.dynamicWidth(this.healthbar_naruto, this.naruto_life);
            }, 2000);
            this.checkWinning(this.naruto_life, this.sasuke_life);
        },
        specialAttack: function () {
            this.match_begin = true;
            var d_b_n = this.damageFunction(15);
            this.turns.unshift({
                isPlayer: true,
                text: 'Maruto Hit Sasuke for ' + d_b_n
            });
            this.sasuke_life = this.sasuke_life - d_b_n;
            this.dynamicWidth(this.healthbar_sasuke, this.sasuke_life);
            setTimeout(() => {
                var d_b_s = this.damageFunction(15);
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Sasuke Hit Naruto for ' + d_b_s
                });
                this.naruto_life = this.naruto_life - d_b_s;
                this.dynamicWidth(this.healthbar_naruto, this.naruto_life);
            }, 500);
            this.checkWinning(this.naruto_life, this.sasuke_life);
        },
        heal: function () {
            var heal = this.damageFunction(10);
            this.naruto_life = this.naruto_life + heal;
            this.dynamicWidth(this.healthbar_naruto, this.naruto_life);
            this.turns.unshift({
                isPlayer: true,
                text: 'Naruto Heal ' + heal
            });
            setTimeout(() => {
                var heal = this.damageFunction(10);
                this.sasuke_life = this.naruto_life + heal;
                this.dynamicWidth(this.healthbar_sasuke, this.sasuke_life);
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Sasuke Heal ' + heal
                });
            }, 2000);
        },
        giveUp: function () {
            this.start_game = !this.start_game;
            this.match_begin = false;
            this.turns = [];
            this.naruto_life = 100;
            this.sasuke_life = 100;
            this.dynamicWidth(this.healthbar_naruto, this.naruto_life);
            this.dynamicWidth(this.healthbar_sasuke, this.sasuke_life);
        },
        damageFunction: function (damage) {
            return Math.floor(Math.random() * damage)
        },
        checkWinning: function (naruto, suasuke) {
            if (naruto <= 0) {
                confirm("You Lost!! Wanna Play Again");
            } else if (suasuke <= 0) {
                confirm("You Won!! Wanna Play Again");
            }
        },
        dynamicWidth: function (character, life) {
            character.width = life + '%';
        },
    },
})