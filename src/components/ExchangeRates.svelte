<script lang="ts">
    import {onMount} from 'svelte'
    // @ts-ignore
    import currencyapi from '@everapi/currencyapi-js'

    export let API_KEY:string

    let sekToUsd:any,
        sekToEur:any,
        lastUpdated = 'Loading...'

    const client = new currencyapi(API_KEY)

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
    }}

    onMount(() => {
        getExchangeRate()
    })
</script>

<div class="exchange-rates m-4">
    <h1 class='py-2 text-xl text-blue-500 font-semibold'>Current exchange rates:</h1>
    <p>SEK to USD: {sekToUsd}</p>
    <p>SEK to EUR: {sekToEur}</p>
    <p>Last updated: {lastUpdated}</p>
</div>
