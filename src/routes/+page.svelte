<script>
    import {onMount} from 'svelte'
    // @ts-ignore
    import currencyapi from '@everapi/currencyapi-js'
    // Initializing the client with personal API-key
    const client = new currencyapi('cur_live_PsftBWdChUgy9gXfqnd1P4lOu0kEoUtPvkLyuiBw')

    let transactionlist = [
        {transactionDate: 240501, amount: 10, currency: 'SEK'},
        {transactionDate: 240502, amount: 23, currency: 'EUR'},
        {transactionDate: 240503, amount: 17, currency: 'EUR'}
    ]

    let transactionDate = ''
    let amount = ''
    let currency = ''
    let i = 0
    let sekToUsd = 'Loading...'
    let sekToEur = 'Loading...'
    let lastUpdated = 'Loading...'

    // Loading transactions from localStorage
    onMount(() => {
        const savedTransactions = localStorage.getItem('transactionlist')
        if (savedTransactions) {transactionlist = JSON.parse(savedTransactions)}
    })

    // code following the $: will be recalculated automatically when the variables used within it change
    $: selected = transactionlist[i]

    // @ts-ignore
    $: update_input(selected)

    const getExchangeRate = async() => {
        try {
            const response = await client.latest({
                base_currency: 'SEK',
                currencies: 'USD,EUR'
            })
                console.log(response)
                sekToUsd = response.data.USD.value || 'Unavailable' // Accessing the SEK rate from the response
                sekToEur = response.data.EUR.value || 'Unavailable'
                lastUpdated = response.meta.last_updated_at || 'Unavailable' // Accessing the last updated timestamp from the response
                console.log('Current exchange rates: ', sekToUsd, sekToEur)
                console.log('Last updated at:', lastUpdated)
        } catch (error) {
            console.error('Error fetching exchange rates.', error)
            sekToUsd = 'Error'
            sekToEur = 'Error'
            lastUpdated = 'Error'
        }
    }

    getExchangeRate()

    function create() {
        if (transactionDate && amount && currency) {
            transactionlist.push({transactionDate: Number(transactionDate), amount: Number(amount), currency: currency})
            // Reassigning array to trigger reactivity
            transactionlist = [...transactionlist]
            saveToLocalStorage()

            // Clearing input fields
            transactionDate = ''
            amount = ''
            currency = ''
        } else {
            alert('Please fill in all fields.')
        }
    }

    function update() {
        selected.transactionDate = Number(transactionDate)
        selected.amount = Number(amount)
        selected.currency = currency

        // Reassigning array to trigger reactivity
        transactionlist = [...transactionlist]
        saveToLocalStorage()
    }

    function remove() {
        let index = transactionlist.indexOf(selected)
        transactionlist.splice(index, 1)

        // Reassigning array to trigger reactivity
        transactionlist = [...transactionlist]
        saveToLocalStorage()

        // Clearing input fields
        transactionDate = ''
        amount = ''
        currency = ''
    }

    // updates input fields when a new transaction is selected
    // @ts-ignore
    function update_input(transaction) {
        transactionDate = selected ? String(selected.transactionDate) : ''
        amount = selected ? String(selected.amount) : ''
        currency = selected ? selected.currency : ''
    }

    function saveToLocalStorage() {
        localStorage.setItem('transactionlist', JSON.stringify(transactionlist))
    }
</script>

<body>
    <div class="transaction-list">
        <h3>Transaction list</h3>
         <!-- Displaying all transactions as a list -->
        <select bind:value={i} size={10}>
            {#each transactionlist as transaction, i}
                <option value={i}>{transaction.transactionDate}, {transaction.amount}, {transaction.currency}</option>
            {/each}
        </select>
    </div>

    <div class="input-fields">
        <label><input bind:value={transactionDate} placeholder="Transaction Date" /></label>
        <label><input bind:value={amount} placeholder="Amount" /></label>
        <label><input bind:value={currency} placeholder="Currency" /></label>
    </div>

    <div class="buttons">
        <button on:click={create} disabled={!transactionDate || !amount || !currency}>Create</button>
        <button on:click={update} disabled={!transactionDate || !amount || !currency}>Update</button>
        <button on:click={remove} disabled={!selected}>Delete</button>
    </div>

    <div class="exchange-rates">
        <h3>Current exchange rates:</h3>
        <p>SEK to USD: {sekToUsd}</p>
        <p>SEK to EUR: {sekToEur}</p>
        <p>Last updated: {lastUpdated}</p>
    </div>

</body>

<style>
    .input-fields, .buttons, .transaction-list {
        margin: 1rem
    }
</style>