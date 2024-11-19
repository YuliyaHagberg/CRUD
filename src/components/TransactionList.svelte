<script lang="ts">
    import { onMount } from 'svelte'
    import { transactionlist } from './variables'

    type Transaction = {
        transactionDate: number
        amount: number
        currency: string
    }

    export let transactionList: Transaction[] = transactionlist

    let transactionDate: number,
        amount: number,
        currency: string = ''
    let i: number = 0

    $: selected = transactionList[i]

    // Load transactions from local storage
    const loadTransactions = () => {
        const savedTransactions = localStorage.getItem('transactionList')
        if (savedTransactions) {
            transactionList = JSON.parse(savedTransactions)
        }
    }

    const create = () => {
        if (!transactionDate || !amount || !currency) {
            alert('Please fill in all fields.')
            return
        }
        transactionList.push({
            transactionDate: Number(transactionDate),
            amount: Number(amount),
            currency: currency,
        })

        // Reassigning array to trigger reactivity
        transactionList = [...transactionList]
        saveToLocalStorage()

        // Clearing input fields
        transactionDate = 0
        amount = 0
        currency = ''
    }

    const update = () => {
        if (selected) {
            selected.transactionDate = Number(transactionDate)
            selected.amount = Number(amount)
            selected.currency = currency

            // Reassigning array to trigger reactivity
            transactionList = [...transactionList]
            saveToLocalStorage()
        }
    }

    const remove = () => {
        if (selected) {
            const index = transactionList.indexOf(selected)
            if (index > -1) {
                transactionList.splice(index, 1)

                // Reassigning array to trigger reactivity
                transactionList = [...transactionList]
                saveToLocalStorage()

                // Clearing input fields
                transactionDate = 0
                amount = 0
                currency = ''
            }
        }
    }

    // Update input fields based on the selected transaction
    const updateInput = (transaction: Transaction | null) => {
        transactionDate = transaction ? Number(transaction.transactionDate) : 0
        amount = transaction ? Number(transaction.amount) : 0
        currency = transaction ? transaction.currency : ''
    }

    // Save the transaction list to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem('transactionList', JSON.stringify(transactionList))
    }

    onMount(() => {
        loadTransactions()
    })

    // Automatically update inputs when a new transaction is selected
    $: updateInput(selected)
</script>

<div class="transaction-list m-4">
    <h1 class='py-2 text-xl text-blue-500 font-semibold'>Transaction list</h1>
    <!-- Displaying all transactions as a list -->
    <select class='min-w-64 max-w-80 border-2 border-gray-400' bind:value={i} size={10}>
        {#each transactionList as transaction, idx}
            <option value={idx}>
                {transaction.transactionDate}, {transaction.amount}, {transaction.currency}
            </option>
        {/each}
    </select>
</div>

<div class="input-fields m-4">
    <label>
        <input
            bind:value={transactionDate}
            placeholder="Transaction Date"
            class='w-32 border border-gray-500 px-2 py-1'/>
    </label>
    <label>
        <input
            bind:value={amount}
            placeholder="Amount"
            class='w-32 border border-gray-500 px-2 py-1'/>
    </label>
    <label>
        <input
            bind:value={currency}
            placeholder="Currency"
            class='w-32 border border-gray-500 px-2 py-1'/>
    </label>
</div>

<div class="buttons m-4">
    <button
        class='w-32 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold'
        on:click={create}
        disabled={!transactionDate || !amount || !currency}>
        Create
    </button>
    <button
        class='w-32 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold'
        on:click={update}
        disabled={!transactionDate || !amount || !currency}>
        Update
    </button>
    <button
        class='w-32 px-4 py-1 rounded border-2 border-red-500 text-red-500 font-semibold'
        on:click={remove}
        disabled={!selected}>
        Delete
    </button>
</div>
