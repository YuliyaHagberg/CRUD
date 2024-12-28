<script lang="ts">
  import { fetchRequest } from "./api";
  import { goto } from "$app/navigation";

  let username = "";
  let password = "";

  const login = async () => {
    try {
      console.log("Sending login request:", { username, password });
      const { res, json } = await fetchRequest(
        "POST",
        "api/login",
        { username, password },
        false,
        true,
      );
      console.log("Response JSON:", json);

      if (!res.ok) {
        throw new Error(json.message || "Invalid login credentials");
      }

      localStorage.setItem("token", `${json.token}`);
      alert("Login successful!");
      goto("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div class="m-4">
  <h2 class="py-2 text-xl text-blue-500 font-semibold">Login</h2>

  <form class="flex flex-col space-y-4" on:submit|preventDefault={login}>
    <input
      class="w-64 border rounded border-gray-500 px-2 py-1"
      type="text"
      placeholder="Username"
      bind:value={username}
      required
    />
    <input
      class="w-64 border rounded border-gray-500 px-2 py-1"
      type="password"
      placeholder="Password"
      bind:value={password}
      required
    />

    <button
      type="submit"
      class="w-64 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold"
    >
      Login
    </button>
  </form>
</div>
