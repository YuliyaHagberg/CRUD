<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import CreatePoll from "./CreatePoll.svelte";

    let group_id: number | null = null;
    let groupDetails: Record<string, any> | null = null;
    let hasPolls: boolean = false;
    let pollForm = false;
    let polls: any[] = [];

    $: group_id = Number($page.params.id);
    $: console.log("Page params:", $page.params);
    $: console.log("Group ID:", group_id);

    const fetchGroupDetails = () => {
        try {
            const groupsString = localStorage.getItem("groups");
            if (!groupsString) {
                throw new Error("No groups data found in localStorage.");
            }

            const groups = JSON.parse(groupsString);
            groupDetails =
                groups.find(
                    (group: any) => Number(group.id) === Number(group_id),
                ) || null;

            if (!groupDetails) {
                throw new Error(`Group with ID ${group_id} not found.`);
            }

            hasPolls = checkForPolls();
            console.log(`This group has polls: ${hasPolls}`);
            const storedPolls = JSON.parse(
                localStorage.getItem(`polls`) || "[]",
            );
            polls = storedPolls.filter(
                (poll: any) => Number(poll.group_id) === Number(group_id),
            );
        } catch (error: any) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const checkForPolls = () => {
        try {
            const pollsString = localStorage.getItem("polls");
            if (!pollsString) {
                console.warn("No polls data found in localStorage.");
                return false;
            }

            const polls = JSON.parse(pollsString);
            console.log(polls);
            if (typeof polls !== "object" || polls === null) {
                throw new Error("Invalid polls data format in localStorage.");
            }

            return Array.isArray(polls) && polls.length > 0;
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    };

    const handlePollCreated = (event: CustomEvent) => {
        alert("Poll created successfully!");
        pollForm = false;
        console.log("New poll has been created:", event.detail.poll);
    };

    onMount(fetchGroupDetails);
</script>

{#if groupDetails}
    <div class="m-4">
        <h2 class="text-2xl font-semibold text-blue-500 py-2">
            {groupDetails.name}
        </h2>
        <p>
            <strong>Description:</strong>
            {groupDetails.description || "No description provided"}
        </p>
        <p>
            <strong>Created By:</strong>
            {groupDetails.created_by || "Unknown"}
        </p>
        <p><strong>Active:</strong> {groupDetails.active ? "Yes" : "No"}</p>
        <p><strong>Public:</strong> {groupDetails.public ? "Yes" : "No"}</p>
        <p>
            <strong>Member Count:</strong>
            {groupDetails.member_count || "N/A"}
        </p>
        <p><strong>Chat ID:</strong> {groupDetails.chat_id || "N/A"}</p>

        <button
            on:click={() => (pollForm = !pollForm)}
            class="bg-blue-500 text-white px-4 py-2 rounded"
        >
            {pollForm ? "Close form" : "Create poll"}
        </button>

        {#if pollForm}
            <CreatePoll {group_id} on:pollCreated={handlePollCreated} />
        {/if}

        <h3 class="text-lg font-medium text-blue-400 pt-4">Polls</h3>
        {#if polls.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each polls as poll}
                    <div
                        class="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
                    >
                        <h4 class="text-xl font-semibold text-blue-500">
                            {poll.title}
                        </h4>
                        <p>{poll.description}</p>
                        <p>
                            <strong>Start Date:</strong>
                            {new Date(poll.start_date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>End Date:</strong>
                            {new Date(poll.end_date).toLocaleDateString()}
                        </p>
                        <a
                            href={`/group/${group_id}/poll/${poll.id}`}
                            class="text-blue-400 underline mt-2 block"
                            >View Details</a
                        >
                    </div>
                {/each}
            </div>
        {:else}
            <p>No polls have been published in this group yet.</p>
        {/if}
    </div>
{:else}
    <p>Loading group details...</p>
{/if}
