<script lang="ts">
    import ExchangeRates from '../../components/ExchangeRates.svelte'
    import TransactionList from '../../components/TransactionList.svelte'
    
    const API_KEY = import.meta.env.VITE_API_KEY

</script>

<body class='bg-white'>
    <TransactionList />
    <ExchangeRates {API_KEY} />
</body>