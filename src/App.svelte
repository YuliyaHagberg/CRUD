<script>
    // Array med transaktioner
    let transactionlist = [
        {transactionDate: 240501, amount: 10, currency: 'SEK'},
        {transactionDate: 240502, amount: 23, currency: 'EUR'},
        {transactionDate: 240503, amount: 17, currency: 'EUR'}
    ]

    let transactionDate = ''
    let amount = ''
    let currency = ''
    let i = 0

    function create() {

    }

    function update() {

    }

    function remove() {

    }

</script>

<label><input bind:value={transactionDate} placeholder="Transaction Date" /></label>
<label><input bind:value={amount} placeholder="Amount" /></label>
<label><input bind:value={currency} placeholder="Currency" /></label>

