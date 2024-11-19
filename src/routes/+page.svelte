<script lang="ts">
    import "../app.css"
    import Header from '../components/Header.svelte'
    import Footer from '../components/Footer.svelte'
    import ExchangeRates from '../components/ExchangeRates.svelte'
    import TransactionList from '../components/TransactionList.svelte'
    
    const API_KEY = import.meta.env.VITE_API_KEY

</script>

<Header />

<body class='bg-white'>
    <TransactionList />
    <ExchangeRates {API_KEY} />
</body>

<Footer />