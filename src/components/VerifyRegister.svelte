<script lang="ts">
  import { writable } from "svelte/store";

  const verificationCode = writable("");

  const token = "tokenAuth";

  const verifyRegistration = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            code: $verificationCode,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Verification failed");
      }
      alert("Verification successful!");
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div class="m-4">
  <h2 class="py-2 text-xl text-blue-500 font-semibold">Verify Registration</h2>

  <form
    class="flex flex-col space-y-4"
    on:submit|preventDefault={verifyRegistration}
  >
    <input
      class="w-64 border rounded border-gray-500 px-2 py-1"
      type="text"
      placeholder="Verification Code"
      bind:value={$verificationCode}
    />

    <button
      type="submit"
      class="w-64 px-4 py-1 rounded border-2 border-blue-500 text-blue-500 font-semibold"
    >
      Verify
    </button>
  </form>
</div>
