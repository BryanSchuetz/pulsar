<script>
const screens  = ['sm', 'md', 'lg', 'xl']
</script>

{#each screens as screen, index}
  <span class="{index > 0 ? 'hidden' :''} {screen}:inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 {index < screens.length - 1 ? screens[index + 1] + ':hidden' : ''}">{screen}</span>  
{/each}
