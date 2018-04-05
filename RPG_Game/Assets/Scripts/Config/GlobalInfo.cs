using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalInfo : MonoBehaviour
{

    private static GlobalInfo instance;

    public static GlobalInfo Instance()
    {
        return instance;
    }

    // World Settings
    bool inWorld;
    bool inZone;
    bool inBattle;

    // Player Settings
    float movementSpeed_World;
    float playerHeight;

    void Awake()
    {
        instance = this;

        // World
        inWorld = true;

        // Player
        movementSpeed_World = 6.0f;
        playerHeight = 1.5f;
    }

    public void SetWorld()
    {
        inWorld = true;
        inZone = false;
        inBattle = false;
    }

    public void SetZone()
    {
        inWorld = false;
        inZone = true;
        inBattle = false;
    }

    public void SetBattle()
    {
        inWorld = false;
        inZone = false;
        inBattle = true;
    }

    public bool is_in_world()
    {
        return inWorld;
    }

    public bool is_in_zone()
    {
        return inZone;
    }

    public bool is_in_battle()
    {
        return inBattle;
    }

    public float get_movspeed_world()
    {
        return movementSpeed_World;
    }

    public float get_player_height()
    {
        return playerHeight;
    }
}
