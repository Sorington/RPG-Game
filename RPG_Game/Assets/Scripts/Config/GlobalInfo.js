#pragma strict

public class GlobalInfo extends MonoBehaviour
{
	private static var instance : GlobalInfo;
	
	public static function Instance() : GlobalInfo
	{
		return instance;
	}
	
	// World Settings
	var inWorld : boolean;
	var inZone : boolean;
	var inBattle : boolean;
	
	// Player Settings
	var movementSpeed_World : float;
	var playerHeight : float;
	
	function Awake()
	{
		instance = this;
		
		// World
		inWorld = true;
		
		// Player
		movementSpeed_World = 6.0f;
		playerHeight = 1.5f;
	}
	
	function SetWorld()
	{
		inWorld = true;
		inZone = false;
		inBattle = false;
	}
	
	function SetZone()
	{
		inWorld = false;
		inZone = true;
		inBattle = false;
	}
	
	function SetBattle()
	{
		inWorld = false;
		inZone = false;
		inBattle = true;
	}
}