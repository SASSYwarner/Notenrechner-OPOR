   <script>
    function CalcLk() {
        const table = document.getElementById("Notenpunktetabelle");
        let LkPunktzahl = 0;

        for (let x = 1; x <= 4; x++) {
            for (let y = 1; y <= 2; y++) {
                LkPunktzahl += Number(table.rows[y].cells[x].textContent) || 0;
            }
        }
        return LkPunktzahl
    }

    function CalcGk() {
        const table = document.getElementById("Notenpunktetabelle");
        let GkPunktzahl = 0;

        for (let x = 1; x <= 4; x++) {
            for (let y = 3; y <= 9; y++) {
                if(table.rows[y].cells[x].getAttribute("contenteditable")) {
                    GkPunktzahl += Number(table.rows[y].cells[x].textContent) || 0;
                }
            }
        }
        return GkPunktzahl
    }

    function CalcPrüf() {
        const table = document.getElementById("Notenpunktetabelle");
        let PrüfPunktzahl = 0;

        for (let y = 1; y <= 5; y++) {
            PrüfPunktzahl += Number(table.rows[y].cells[5].textContent) || 0;
        }
        return PrüfPunktzahl
    }

    function CalcGes() {
        let LkPunktzahl = CalcLk() * 2;
        console.log(LkPunktzahl);
        let GkPunktzahl = CalcGk();
        console.log(GkPunktzahl);
        let PrüfPunktzahl = CalcPrüf() * 4;
        console.log(PrüfPunktzahl);
        let Punktzahl = LkPunktzahl + GkPunktzahl + PrüfPunktzahl;
        console.log(Punktzahl);
        let Schnitt = Math.round(56.6 - Punktzahl / 18.0)/10;
        console.log(Schnitt);
    }
  </script>
