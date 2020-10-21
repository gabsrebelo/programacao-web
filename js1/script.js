function multiply(i){
    for (let j = 1; j <= 10; j++) {
        document.write(`<tr>
                            <td>${i}x${j}</td>
                            <td> ${(i * j)}</td>
                        <tr>`);
    }
}

function createProductTable(i){
    document.write(
        `<td>
            <table>
            <th colspan="2">Produtos de ${i} </th>
                <tbody>`);
    
        multiply(i);
    
        document.write(`
                </tbody>
            </table>
        </td>`);
}

document.write(`
<table id="tab">
    <tbody>
        <tr class="row">`);

for (let i = 1; i <=5; i++) {
    createProductTable(i);
}

document.write(`
        </tr>
        <tr class="row">`);

for (let i = 6; i <= 10; i++) {
    createProductTable(i);
}

document.write(`
        </tr>
    </tbody>
</table>`);

