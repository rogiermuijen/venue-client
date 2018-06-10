import axios from 'axios'
import { getLeaderBoardData } from '~/services/leaderboard'
import { retrieveStats } from '~/services/dashboard'

export const state = () => ({
  copiedSignatureId: undefined,
  leaderboard: {
    // "rankings": [
    //   {
    //     "username": "joemar.ct",
    //     "rank": 1,
    //     "total_posts": 1,
    //     "total_points": 105,
    //     "total_tokens": 120000
    //   },
    //   ...
    // ],
    // "sitewide": {
    //   "available_points": "10,000",
    //   "available_tokens": "120,000",
    //   "total_users": 3,
    //   "total_posts": 2
    // },
    // "forumstats": {
    //   "posts": [
    //     {
    //       "forumSite": "bitcointalk.org",
    //       "value": 2,
    //       "color": "#2a96b6"
    //     },
    //     ...
    //   ],
    //   "users": [
    //     {
    //       "forumSite": "bitcointalk.org",
    //       "value": 3,
    //       "color": "#2a96b6"
    //     },
    //     ...
    //   ]
    // }
  },
  userStats: {
  //   "profile_level": [
  //     {
  //       "User_ID": "1929041",
  //       "forumSite": "bitcointalk.org",
  //       "forumUserId": "1929041",
  //       "forumUserRank": "Brand new",
  //       "numPosts": 0,
  //       "totalPoints": 0,
  //       "VTX_Tokens": 0
  //     }
  //   ],
  //   "user_level": {
  //     "daily_stats": [
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": null,
  //         "date": "2018-06-04"
  //       },
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": null,
  //         "date": "2018-06-05"
  //       },
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": null,
  //         "date": "2018-06-06"
  //       },
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": null,
  //         "date": "2018-06-07"
  //       },
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": 2,
  //         "date": "2018-06-08"
  //       },
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": 2,
  //         "date": "2018-06-09"
  //       },
  //       {
  //         "posts": {
  //           "credited": 0,
  //           "pending": 0,
  //           "total": 0
  //         },
  //         "rank": 2,
  //         "date": "2018-06-10"
  //       }
  //     ],
  //     "total_posts": 0,
  //     "total_points": 0,
  //     "total_points_pct": 0,
  //     "total_tokens": 0,
  //     "overall_rank": 2
  //   },
  //   "sitewide": {
  //     "total_users": 3,
  //     "total_posts": 2,
  //     "available_tokens": "120,000"
  //   }
  }
})

export const actions = {
  async nuxtServerInit ( { commit }, context) {

    const { data: leaderboardData } = await getLeaderBoardData()
    await commit('setLeaderboardData', leaderboardData)

    // const { data: userStats } = await axios.get('http://localhost:8000/api/retrieve/stats/', { headers })
    // const { data: userStats } = await retrieveStats()

    // await commit('setUserStats', userStats.stats)
  }
}

export const mutations = {
  signatureCopied (state, signatureId) {
    state.copiedSignatureId = signatureId
  },
  setLeaderboardData (state, { rankings, sitewide, forumstats }) {
    state.leaderboard = { ...state.leaderboard, rankings, sitewide, forumstats }
  },
  setUserStats (state, { profile_level, user_level, sitewide }) {
    state.userStats = { ...state.userStats, profile_level, user_level, sitewide }
  }
};