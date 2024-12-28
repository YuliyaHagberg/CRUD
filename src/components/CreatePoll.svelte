<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fetchRequest } from "./api";
    import { goto } from "$app/navigation";

    export let group_id: number | null = null;

    let title = "";
    let description = "";
    let start_date = "";
    let proposal_end_date = "";
    let prediction_statement_end_date = "";
    let area_vote_end_date = "";
    let prediction_bet_end_date = "";
    let delegate_vote_end_date = "";
    let vote_end_date = "";
    let end_date = "";
    let poll_type = "1";
    let blockchain_id: number | null = null;
    let publicPoll = false;
    let allow_fast_forward = false;
    let tag = "";
    let pinned = false;
    let dynamic = true;
    let quorum = 0;
    let attachments: any[] = [];

    const dispatch = createEventDispatcher();

    const createPoll = async () => {
        if (!group_id) {
            alert("Invalid group ID. Cannot create poll.");
            return;
        }

        try {
            const rawPollData: Record<string, any> = {
                title,
                description,
                start_date: start_date
                    ? new Date(start_date).toISOString()
                    : null,
                area_vote_end_date: area_vote_end_date
                    ? new Date(area_vote_end_date).toISOString()
                    : null,
                proposal_end_date: proposal_end_date
                    ? new Date(proposal_end_date).toISOString()
                    : null,
                prediction_statement_end_date: prediction_statement_end_date
                    ? new Date(prediction_statement_end_date).toISOString()
                    : null,
                prediction_bet_end_date: prediction_bet_end_date
                    ? new Date(prediction_bet_end_date).toISOString()
                    : null,
                delegate_vote_end_date: delegate_vote_end_date
                    ? new Date(delegate_vote_end_date).toISOString()
                    : null,
                vote_end_date: vote_end_date
                    ? new Date(vote_end_date).toISOString()
                    : null,
                end_date: end_date ? new Date(end_date).toISOString() : null,
                poll_type,
                blockchain_id,
                public: publicPoll,
                allow_fast_forward,
                tag,
                pinned,
                dynamic,
                quorum,
                attachments,
            };

            const pollData: Record<string, any> = {};
            for (const [key, value] of Object.entries(rawPollData)) {
                if (
                    value !== null &&
                    value !== "" &&
                    value !== false &&
                    value !== 0 &&
                    !(Array.isArray(value) && value.length === 0)
                ) {
                    pollData[key] = value;
                }
            }

            console.log("Polldata:", pollData);

            const { res, json } = await fetchRequest(
                "POST",
                `api/group/${group_id}/poll/create`,
                pollData,
                true,
                true,
            );

            if (!res.ok) {
                throw new Error("Failed to create poll.");
            }

            const pollId: number = json;
            console.log("Poll ID:", json);

            const poll = {
                id: pollId,
                group_id,
                title,
                description,
                start_date: start_date
                    ? new Date(start_date).toISOString()
                    : null,
                area_vote_end_date: area_vote_end_date
                    ? new Date(area_vote_end_date).toISOString()
                    : null,
                proposal_end_date: proposal_end_date
                    ? new Date(proposal_end_date).toISOString()
                    : null,
                prediction_statement_end_date: prediction_statement_end_date
                    ? new Date(prediction_statement_end_date).toISOString()
                    : null,
                prediction_bet_end_date: prediction_bet_end_date
                    ? new Date(prediction_bet_end_date).toISOString()
                    : null,
                delegate_vote_end_date: delegate_vote_end_date
                    ? new Date(delegate_vote_end_date).toISOString()
                    : null,
                vote_end_date: vote_end_date
                    ? new Date(vote_end_date).toISOString()
                    : null,
                end_date: end_date ? new Date(end_date).toISOString() : null,
                poll_type,
                blockchain_id,
                public: publicPoll,
                allow_fast_forward,
                tag,
                pinned,
                dynamic,
                quorum,
                attachments,
            };

            const polls = JSON.parse(localStorage.getItem("polls") || "[]");
            polls.push(poll);
            localStorage.setItem("polls", JSON.stringify(polls));

            alert("Poll created successfully!");
            dispatch("pollCreated", { poll: json });
            goto(`/group/${group_id}/poll/${pollId}`);
        } catch (error: any) {
            console.error("Error creating poll:", error.message);
            alert("Failed to create poll. Please try again.");
        }
    };
</script>

<div class="p-4 border rounded shadow-lg bg-white">
    <h3 class="text-lg font-medium text-blue-400 mb-4">Create a New Poll</h3>
    <form on:submit|preventDefault={createPoll} class="space-y-4">
        <div>
            <label>Title</label>
            <input
                type="text"
                bind:value={title}
                placeholder="Poll Title"
                class="block w-full p-2 border rounded"
                maxlength="255"
                required
            />
        </div>
        <div>
            <label>Description</label>
            <textarea
                bind:value={description}
                placeholder="Description"
                class="block w-full p-2 border rounded"
            ></textarea>
        </div>
        <div>
            <label>Start Date</label>
            <input
                type="datetime-local"
                bind:value={start_date}
                class="block w-full p-2 border rounded"
                required
            />
        </div>
        <div>
            <label>Area Vote End Date</label>
            <input
                type="datetime-local"
                bind:value={area_vote_end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Proposal End Date</label>
            <input
                type="datetime-local"
                bind:value={proposal_end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Prediction Statement End Date</label>
            <input
                type="datetime-local"
                bind:value={prediction_statement_end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Prediction Bet End Date</label>
            <input
                type="datetime-local"
                bind:value={prediction_bet_end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Delegate Vote End Date</label>
            <input
                type="datetime-local"
                bind:value={delegate_vote_end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Vote End Date</label>
            <input
                type="datetime-local"
                bind:value={vote_end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>End Date</label>
            <input
                type="datetime-local"
                bind:value={end_date}
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Poll Type</label>
            <select
                bind:value={poll_type}
                class="block w-full p-2 border rounded"
                required
            >
                <option value="1">Ranking</option>
                <option value="2">For/Against</option>
                <option value="3">Schedule</option>
                <option value="4">Cardinal</option>
            </select>
        </div>
        <div>
            <label>Blockchain ID</label>
            <input
                type="number"
                bind:value={blockchain_id}
                placeholder="Blockchain ID"
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Public</label>
            <input type="checkbox" bind:checked={publicPoll} />
        </div>
        <div>
            <label>Allow Fast Forward</label>
            <input type="checkbox" bind:checked={allow_fast_forward} />
        </div>
        <div>
            <label>Tag</label>
            <input
                type="number"
                bind:value={tag}
                placeholder="Tag"
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Pinned</label>
            <input type="checkbox" bind:checked={pinned} />
        </div>
        <div>
            <label>Dynamic</label>
            <input type="checkbox" bind:checked={dynamic} required />
        </div>
        <div>
            <label>Quorum</label>
            <input
                type="number"
                bind:value={quorum}
                placeholder="Quorum"
                class="block w-full p-2 border rounded"
            />
        </div>
        <div>
            <label>Attachments</label>
            <input
                type="url"
                bind:value={attachments}
                placeholder="Attachment URL"
                class="block w-full p-2 border rounded"
            />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded"
            >Create Poll</button
        >
    </form>
</div>
