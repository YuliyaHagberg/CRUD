<script>
  import GroupList from '../../components/GroupList.svelte';
  import CreateGroup from '../../components/CreateGroup.svelte';

  let showCreateGroupForm = false;

  const toggleCreateGroupForm = () => {
      showCreateGroupForm = !showCreateGroupForm;
  };
</script>

<div  class="m-4">  
  <button 
      on:click={toggleCreateGroupForm} 
      class="bg-blue-500 text-white px-4 py-2 rounded mb-1">
      {showCreateGroupForm ? 'Close form' : 'Create group'}
  </button>

  {#if showCreateGroupForm}
      <CreateGroup />
  {/if}

  <GroupList />
</div>
