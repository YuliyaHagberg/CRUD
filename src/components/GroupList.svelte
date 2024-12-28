<script lang="ts">
    import { onMount } from "svelte";

    let groups: any[] = [];

    const fetchGroups = () => {
        try {
            const groupsString = localStorage.getItem("groups");
            if (!groupsString) {
                console.warn("No groups data found in localStorage.");
                groups = [];
                return;
            }

            groups = JSON.parse(groupsString) || [];
        } catch (error) {
            console.error("Failed to fetch groups:", error);
        }
    };

    onMount(fetchGroups);
</script>

<div>
    <h2 class="text-lg font-semibold text-blue-500 py-4">Available Groups</h2>
    {#if groups.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each groups as group}
                <div
                    class="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
                >
                    <h3 class="text-xl font-semibold text-blue-500">
                        {group.name}
                    </h3>
                    <p>{group.description || "No description provided"}</p>
                    <p>
                        <strong>Created By:</strong>
                        {group.created_by || "Unknown"}
                    </p>
                    <p>
                        <strong>Member Count:</strong>
                        {group.member_count || "N/A"}
                    </p>
                    <a
                        href={`/group/${group.id}`}
                        class="text-blue-400 underline mt-2 block"
                        >View Details</a
                    >
                </div>
            {/each}
        </div>
    {:else}
        <p>No groups available. Create one to get started!</p>
    {/if}
</div>
