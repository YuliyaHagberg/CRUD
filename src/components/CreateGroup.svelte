<script lang="ts">
  import { fetchRequest } from "./api";
  import { goto } from "$app/navigation";

  let name = "";
  let description = "";
  let image = "";
  let cover_image = "";
  let hide_poll_users = false;
  let direct_join = false;
  let publicGroup = false;
  let blockchain_id: number | null = null;

  const createGroup = async () => {
    try {
      const rawPayload: Record<string, any> = {
        name,
        description,
        hide_poll_users,
        direct_join,
        public: publicGroup,
        image,
        cover_image,
        blockchain_id,
      };

      const payload: Record<string, any> = {};
      for (const [key, value] of Object.entries(rawPayload)) {
        if (value !== null && value !== "") {
          payload[key] = value;
        }
      }

      console.log("Payload:", payload);

      const { res, json } = await fetchRequest(
        "POST",
        "api/group/create",
        payload,
        true,
        true,
      );

      if (!res.ok) {
        throw new Error("Failed to create group.");
      }

      const groupId: number = json;
      console.log("Group ID:", json);

      const group = {
        id: groupId,
        name,
        description,
        image,
        cover_image,
        hide_poll_users,
        direct_join,
        public: publicGroup,
        blockchain_id,
      };

      const groups = JSON.parse(localStorage.getItem("groups") || "[]");
      groups.push(group);
      localStorage.setItem("groups", JSON.stringify(groups));

      name = "";
      description = "";
      hide_poll_users = false;
      direct_join = false;
      publicGroup = false;
      image = "";
      cover_image = "";
      blockchain_id = null;

      alert("Group created successfully!");
      goto(`/group/${groupId}`);
    } catch (error: any) {
      console.error(error);
    }
  };
</script>

<div class="m-4">
  <h2 class="text-xl font-semibold text-blue-500 py-2">Create a New Group</h2>

  <form class="flex flex-col space-y-4" on:submit|preventDefault={createGroup}>
    <input
      type="text"
      class="border rounded px-2 py-1"
      placeholder="Group Name"
      bind:value={name}
      required
    />
    <textarea
      class="border rounded px-2 py-1"
      placeholder="Description (optional)"
      bind:value={description}
    ></textarea>
    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={hide_poll_users} />
      <span>Hide poll users</span>
    </label>
    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={direct_join} />
      <span>Direct join</span>
    </label>
    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={publicGroup} />
      <span>Public group</span>
    </label>
    <input
      type="url"
      class="border rounded px-2 py-1"
      placeholder="Image URL (optional)"
      bind:value={image}
    />
    <input
      type="url"
      class="border rounded px-2 py-1"
      placeholder="Cover Image URL (optional)"
      bind:value={cover_image}
    />
    <input
      type="number"
      class="border rounded px-2 py-1"
      placeholder="Blockchain ID (optional)"
      bind:value={blockchain_id}
      min="0"
    />

    <button
      type="submit"
      class="px-4 py-1 text-blue-500 font-semibold border border-blue-500 rounded"
    >
      Create Group
    </button>
  </form>
</div>
