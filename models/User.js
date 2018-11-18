const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        password: String,
        facebookID: String,
        googleID: String,
        luckyNumbers: [],

        // schemas for each game user saves numbers for

        numbersPlayed: {
            // counter to tell how many sets of numbers you have saved
            counterPick2: Number,
            //    array of saved tickets for each game
            pick2: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    pick2Numbers: [{}]
                }
            ],

            pick3: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    pick3Numbers: [{}]
                }
            ],

            pick4: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    pick4Numbers: [{}]
                }
            ],

            pick5: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    pick5Numbers: [{}]
                }
            ],

            Fantasy5: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    Fantasy5Numbers: [{}]
                }
            ],

            luckyMoney: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    megaMillionsNumbers: [{}]
                }
            ],

            megaMillions: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    megaMillionsNumbers: [{}]
                }
            ],

            powerBalls: [
                {
                    Ticket: Number,
                    SavedAt: Date,
                    PowerBallNumbers: [{}]
                }
            ],


        },

        experiencePoints: {
            type: Number,
            default: 100
        },

        wishes: {
            type: Number,
            default: 3
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
