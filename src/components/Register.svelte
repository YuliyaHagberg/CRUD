<script lang="ts">
  import { writable } from "svelte/store";
  import { fetchRequest } from "./api";

  const username = writable("");
  const email = writable("");

  const registerUser = async () => {
    try {
      const { res, json } = await fetchRequest(
        "POST",
        "api/register",
        {
          username: $username,
          email: $email,
        },
        true,
        true,
      );

      if (!res.ok) {
        throw new Error(json.detail || "Registration failed");
      }

      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering new user. ", error);
    }
  };
</script>

<div class="m-4">
  <h2 class="py-2 text-xl text-blue-500 font-semibold">Register</h2>

  <form class="flex flex-col space-y-4" on:submit|preventDefault={registerUser}>
    <input
      class="w-64 border rounded border-gray-500 px-2 py-1"
      type="text"
      placeholder="Username"
      bind:value={$username}
    />

    <input
      class="w-64 border rounded border-gray-500 px-2 py-1"
      type="email"
      placeholder="Email"
      bind:value={$email}
    />

    <button
      type="submit"
      class="w-64 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold"
      disabled={!$username || !$email}
    >
      Register
    </button>
  </form>
</div>
