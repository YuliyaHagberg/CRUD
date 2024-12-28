<script lang="ts">
    import { createEventDispatcher } from "svelte";

    type Transaction = {
        transactionDate: number;
        amount: number;
        currency: string;
    };

    export let transactionDate: number = 0,
        amount: number = 0,
        currency: string = "",
        selected: Transaction;

    const dispatch = createEventDispatcher();

    const create = () => {
        if (!transactionDate || !amount || !currency) {
            alert("Please fill in all fields.");
            return;
        }

        dispatch("create", {
            transactionDate: Number(transactionDate),
            amount: Number(amount),
            currency: currency,
        });

        transactionDate = 0;
        amount = 0;
        currency = "";
    };

    const update = () => {
        if (selected) {
            dispatch("update", {
                transactionDate: Number(transactionDate),
                amount: Number(amount),
                currency: currency,
            });
        }
    };

    const remove = () => {
        if (selected) {
            dispatch("remove");
        }
    };
</script>

<div class="input-fields m-4">
    <label>
        <input
            bind:value={transactionDate}
            placeholder="Transaction Date"
            class="w-32 border rounded border-gray-500 px-2 py-1"
        />
    </label>
    <label>
        <input
            bind:value={amount}
            placeholder="Amount"
            class="w-32 border rounded border-gray-500 px-2 py-1"
        />
    </label>
    <label>
        <input
            bind:value={currency}
            placeholder="Currency"
            class="w-32 border rounded border-gray-500 px-2 py-1"
        />
    </label>
</div>

<div class="buttons m-4">
    <button
        class="w-32 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold"
        on:click={create}
        disabled={!transactionDate || !amount || !currency}
    >
        Create
    </button>
    <button
        class="w-32 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold"
        on:click={update}
        disabled={!transactionDate || !amount || !currency}
    >
        Update
    </button>
    <button
        class="w-32 px-4 py-1 rounded border-2 border-red-500 text-red-500 font-semibold"
        on:click={remove}
        disabled={!selected}
    >
        Delete
    </button>
</div>
