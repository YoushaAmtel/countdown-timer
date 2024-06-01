
import chalk from 'chalk';
import inquirer from 'inquirer';
import { differenceInSeconds } from 'date-fns';



(async () => {
    const res = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Please enter the amount of seconds (1-60):",
        validate: (input: number) => {
            if (isNaN(input)) {
                return "Please enter a valid number.";
            } else if (input < 1 || input > 60) {
                return "Seconds must be between 1 and 60.";
            } else {
                return true;
            }
        }
    });

    let input = res.userInput;

    function startTime(val: number) {
        const intTime = new Date().setSeconds(new Date().getSeconds() + val);
        const intervalTime = new Date(intTime);

        const interval = setInterval(() => {
            const currTime = new Date();
            const timeDiff = differenceInSeconds(intervalTime, currTime);

            if (timeDiff <= 0) {
                console.log(chalk.red("Timer has expired"));
                clearInterval(interval);
                process.exit();
            }

            const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
            const sec = Math.floor(timeDiff % 60);
            console.log(chalk.green(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }, 1000);
    }

    startTime(input);
})();
