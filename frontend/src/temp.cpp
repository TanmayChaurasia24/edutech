#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
void solve(int index, string str, int score, vector<int>&v, vector<int>&prefixSum, int &maxi)
{
    if(index==str.length())
    {
        maxi = max(maxi, score);
        return;
    }

    for(int i=index; i<str.length(); i++)
    {
        if(str[i]=='L')
        {
            for(int j=i+1; j<str.length(); j++)
            {
                if(str[j]=='R')
                {
                    str[j] = '.';
                    score+=prefixSum[j]-prefixSum[i]+v[i];
                    solve(i+1, str, score, v, prefixSum, maxi);
                }
            }
        }
    }
}
int main()
{
    int t;
    cin>>t;
    while(t--)   
    {
        int n;
        cin>>n;
        vector<int>v(n);
        for(int i=0; i<n; i++)
        {
            cin>>v[i];
        }
        string str;
        cin>>str;

        int maxi = INT_MIN, score=0;
        vector<int>prefixSum(n);
        prefixSum[0] = v[0];
        for(int i=1; i<str.length(); i++)
        {
            prefixSum[i] = prefixSum[i-1]+v[i];
        }
        solve(0, str, score, v, prefixSum, maxi);
        cout<<maxi<<endl;
    }
    return 0;
}