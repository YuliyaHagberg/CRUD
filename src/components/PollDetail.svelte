<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let group_id: number | null = null;
    let pollId: number | null = null;
    let pollDetails: Record<string, any> | null = null;

    $: {
        pollId = Number($page.params.id);
        console.log("Page params:", $page.params);
        console.log("Group ID:", group_id);
        console.log("Poll ID:", pollId);
    }

    const fetchPollDetails = () => {
        try {
            const pollsString = localStorage.getItem("polls");
            if (!pollsString) {
                throw new Error("No polls data found in localStorage.");
            }

            const polls = JSON.parse(pollsString);
            pollDetails =
                polls.find((poll: any) => Number(poll.id) === Number(pollId)) ||
                null;

            if (!pollDetails) {
                throw new Error(`Poll with ID ${pollId} not found.`);
            }
        } catch (error: any) {
            console.error(error.message);
            alert(error.message);
        }
    };

    onMount(fetchPollDetails);
</script>

{#if pollDetails}
    <div class="m-4">
        <h2 class="text-2xl font-semibold text-blue-500 py-2">
            {pollDetails.title}
        </h2>
        <p>
            <strong>Description:</strong>
            {pollDetails.description || "No description provided"}
        </p>
        <p>
            <strong>Start date:</strong>
            {pollDetails.start_date || "Unknown"}
        </p>
        <p>
            <strong>Area vote end date:</strong>
            {pollDetails.area_vote_end_date || "Unknown"}
        </p>
        <p>
            <strong>Proposal end date:</strong>
            {pollDetails.proposal_end_date || "Unknown"}
        </p>
        <p>
            <strong>Prediction statement end date:</strong>
            {pollDetails.prediction_statement_end_date || "Unknown"}
        </p>
        <p>
            <strong>Prediction bet end date:</strong>
            {pollDetails.prediction_bet_end_date || "Unknown"}
        </p>
        <p>
            <strong>Delegate vote end date:</strong>
            {pollDetails.delegate_vote_end_date || "Unknown"}
        </p>
        <p>
            <strong>Vote end date:</strong>
            {pollDetails.vote_end_date || "Unknown"}
        </p>
        <p>
            <strong>Poll end date:</strong>
            {pollDetails.end_date || "Unknown"}
        </p>
        <p><strong>Poll type:</strong> {pollDetails.poll_type}</p>
        <p>
            <strong>Blockchain ID:</strong>
            {pollDetails.blockchain_id || "Unknown"}
        </p>
        <p><strong>Status:</strong> {pollDetails.publicPoll ? "Yes" : "No"}</p>
        <p>
            <strong>Fast-forward:</strong>
            {pollDetails.allow_fast_forward ? "Yes" : "No"}
        </p>
        <p><strong>Tag:</strong> {pollDetails.tag ? "Yes" : "No"}</p>
        <p><strong>Pinned:</strong> {pollDetails.pinned ? "Yes" : "No"}</p>
        <p><strong>Dynamic:</strong> {pollDetails.dynamic ? "Yes" : "No"}</p>
        <p><strong>Quorum:</strong> {pollDetails.quorum || "Unknown"}</p>
        <p><strong>Attachments:</strong> {pollDetails.attachments || "None"}</p>
    </div>
{:else}
    <p>Loading poll details...</p>
{/if}
