<script>
export let text
export let href
export let icon
import { PenSquare, GitBranchPlus, PocketKnife, Image } from 'lucide-svelte'
</script>

<a href={href} class="text-sm font-semibold leading-6 text-gray-900"><svelte:component this={icon} />{text}</a>