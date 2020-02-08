window.onload = () => radioGenerator();


const staticSecim = [
    "02",   //  -   1   -
    "02",   //  -   2   +
    "10",   //  -   
    "10",   //  -   1   +
    "02",   //  -   0   +
    "12",   //  -   
    "10",   //  -   
    "02",   //  -   
    "12",   //  -   
    "10",   //  -   0   +
    "02",   //  -   
    "10",   //  -   0   +
    "10",   //  -   
    "02",   //  -   
    "12",   //  -   1   +
]

const radioGenerator = () => {
    $.ajax({
        url: "services/run.php?m=getList",
        type: "post",
        success: function (res) {

            if (res.success) {

                let html = "";


                html += "   <thead>";
                html += "   <tr>";
                html += '       <th colspan="3">Takımlar</th>';
                //html += '       <th>Banko Mu?</th>';
                html += '       <th>Seçimler</th>';
                html += "   </tr>";
                html += "   </thead>";

                for (let index = 0; index < 15; index++) {
                    html += `  <tr>`;
                    html += `      <td>` + index + `</td>`;
                    html += `      <td>` + res.data[index] + `</td>`;
                    html += `      <td><button type="button" class="btn btn-danger btn-sm" onclick=clearOption(` + index + `)>X</button></td>`;
                    //  html += `      <td><input class="form-control bankoMu ` + index + `" type="checkbox" ></td>`;
                    html += `      <td><input class="form-control secim ` + index + `" value="` + staticSecim[index] + `" type="text"></td>`;
                    //html += `      <td><input class="form-control secim ` + index + `" value="" type="text"></td>`;
                    html += `  </tr>`;
                }

                //http://istatistik.nesine.com/?st=5

                //istatistik linkini yeni sekmede aç....


                $('#radioTable').html(html);


            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }


    });




}

let hesapla = () => {

    let multiSecim = 1;

    donguArray = [];

    secimArray = [];

    for (let index = 0; index < 15; index++) {


        let bankoMu = $('.bankoMu.' + index).prop('checked')

        let secim = $('.secim.' + index).val()

        secimArray.push(secim);

        if (multiSecim < secim.length && !bankoMu) {
            multiSecim = secim.length;
        }

    }

    for (let aaa = 0; aaa < multiSecim; aaa++) {
        donguArray.push([]);
    }



    for (let j = 0; j < secimArray.length; j++) {
        const scmRow = secimArray[j];

        const option = scmRow.split('');


        if (option.length == 1) {
            donguArray[0][j] = option[0];
            donguArray[1][j] = option[0];
        } else if (option.length == 2) {
            donguArray[0][j] = option[0];
            donguArray[1][j] = option[1];
        }

    }


    kolonlariBöl(donguArray);
}

let kolonlariBöl = (mirrorArray) => {

    console.log("kolonlariBöl başladı");

    sonucDizisi = [];

    let secim1 = '';
    //
    for (let i = 0; i < mirrorArray[0].length; i++) {
        let ilkDiziElemani = mirrorArray[0][i];


        for (let j = 0; j < mirrorArray[1].length; j++) {
            let sonDiziElemani = mirrorArray[1][j];

            if (i != j) {
                secim1 += sonDiziElemani
            } else {
                secim1 += ilkDiziElemani
            }

        }

        sonucDizisi[i] = secim1.split('');
        secim1 = '';

    }


    for (let j = 0; j < mirrorArray[1].length; j++) {
        let sonDiziElemani = mirrorArray[1][j];

        for (let i = 0; i < mirrorArray[0].length; i++) {
            let ilkDiziElemani = mirrorArray[0][i];



            if (j != i) {
                secim1 += ilkDiziElemani
            } else {
                secim1 += sonDiziElemani
            }


        }

        sonucDizisi[j + 15] = secim1.split('');
        secim1 = '';
    }


    //


    console.log(sonucDizisi);
    ekranaBas(sonucDizisi);
}

const ekranaBas = (sonuc = []) => {

    if (sonuc.length == 0) {
        alert('Sonuç dizisi boş geldi')
        return
    }

    let tbody = '';
    let thead = '<thead><tr>';

    for (let a = 0; a < sonuc.length; a++) {

        thead += `<th>${a + 1}</th>`

    }

    for (let satir = 0; satir < 15; satir++) {

        tbody += `<tr>`

        //$('.sportoto-program tbody tr:nth-child(1) td[data-group="0"] input[data-column="0"]').first().prop( "checked", true );


        for (let sutunIndex = 0; sutunIndex < sonuc.length; sutunIndex++) {
            const element = sonuc[sutunIndex];

            tbody += `<td>${element[satir]}</td>`

            komutOlustur()

            //


        }
        /*
                for (const kolon of sonuc) {
                    tbody += `<td>${kolon[satir]}</td>`
                }
        */
        tbody += `</tr>`

    }
    thead += '</tr></thead>';


    console.log('thead', thead);


    $('#resultTable').html(thead + tbody)
}




/*
 $.ajax({
        url: "services/run.php?m=listProcess",
        type: "post",
        dataType: "json",
        data: JSON.stringify({
            banko: bankoArray,
            surpriz: surprizArray,
        }),
        success: function (res) {

            console.log("res.data", res.data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }


    });*/

const clearOption = (index) => {
    $('.secim.' + index).val('')
    $('.bankoMu.' + index).prop('checked', false);
}
