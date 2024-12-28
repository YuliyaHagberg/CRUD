<script lang="ts">
    import { onMount } from "svelte";
    import { transactionlist } from "./variables";
    import TransactionForm from "./TransactionForm.svelte";

    type Transaction = {
        transactionDate: number;
        amount: number;
        currency: string;
    };

    let transactionList: Transaction[] = transactionlist;
    let transactionDate: number = 0,
        amount: number = 0,
        currency: string = "",
        i: number = 0;

    // Load transactions from local storage
    const loadTransactions = () => {
        const savedTransactions = localStorage.getItem("transactionList");
        if (savedTransactions) {
            transactionList = JSON.parse(savedTransactions);
        }
    };

    // Save the transaction list to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem(
            "transactionList",
            JSON.stringify(transactionList),
        );
    };

    const handleCreate = (event: any) => {
        const { transactionDate, amount, currency } = event.detail;
        transactionList.push({
            transactionDate,
            amount,
            currency,
        });

        // Reassigning array to trigger reactivity
        transactionList = [...transactionList];
        saveToLocalStorage();
    };

    const handleUpdate = (event: any) => {
        if (selected) {
            const { transactionDate, amount, currency } = event.detail;
            selected.transactionDate = transactionDate;
            selected.amount = amount;
            selected.currency = currency;

            // Reassigning array to trigger reactivity
            transactionList = [...transactionList];
            saveToLocalStorage();
        }
    };

    const handleRemove = () => {
        if (selected) {
            const index = transactionList.indexOf(selected);
            if (index > -1) {
                transactionList.splice(index, 1);

                // Reassigning array to trigger reactivity
                transactionList = [...transactionList];
                saveToLocalStorage();
            }
        }
    };

    // Update input fields based on the selected transaction
    const updateInput = (transaction: Transaction | null) => {
        transactionDate = transaction ? Number(transaction.transactionDate) : 0;
        amount = transaction ? Number(transaction.amount) : 0;
        currency = transaction ? transaction.currency : "";
    };

    onMount(() => {
        loadTransactions();
    });

    $: selected = transactionList[i];
    // Automatically update inputs when a new transaction is selected
    $: updateInput(selected);
</script>

<div class="transaction-list m-4">
    <h1 class="py-2 text-xl text-blue-500 font-semibold">Transaction list</h1>
    <!-- Displaying all transactions as a list -->
    <select
        class="min-w-64 max-w-80 border-2 border-gray-400"
        bind:value={i}
        size={10}
    >
        {#each transactionList as transaction, idx}
            <option value={idx}>
                {transaction.transactionDate}, {transaction.amount}, {transaction.currency}
            </option>
        {/each}
    </select>
</div>

<TransactionForm
    bind:transactionDate
    bind:amount
    bind:currency
    bind:selected
    on:create={handleCreate}
    on:update={handleUpdate}
    on:remove={handleRemove}
/>
