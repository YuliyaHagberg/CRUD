<!-- This file is used as a template for every page in the application. -->

<header class="default-header">Header</header>

<!-- Slot is replaced with a specific pages' content -->
<slot />

<footer class="default-footer">Footer</footer>

<style>   
    .default-header, .default-footer {
        background-color: seagreen;
        color: white;
        font-size: large;
        text-align: center;
        padding: 1rem;
        width: 100%;
    }
</style>