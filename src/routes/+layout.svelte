<script>
    import "../app.css"
    import Header from '../components/Header.svelte'
    import Footer from '../components/Footer.svelte'
</script>

<Header />

<!-- Slot is replaced with a specific pages' content -->
<slot />

<Footer />