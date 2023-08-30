<script>
export let icon
export let text
export let href
import { PenSquare, GitBranchPlus, PocketKnife, Image } from 'lucide-svelte'
</script>

<a href={href} class="text-sm font-semibold leading-6 text-gray-900">
{#if icon == 'PenSquare'}
  <PenSquare class="inline -top-[1px] relative mr-1" />
  {:else if icon == 'Image'}
  <Image class="inline -top-[1px] relative mr-1" />
  {:else if icon == 'GitBranchPlus'}
  <GitBranchPlus class="inline -top-[1px] relative mr-1" />
  {:else if icon == 'PocketKnife'}
  <PocketKnife class="inline -top-[1px] relative mr-1" />
{/if}

{text}
</a>