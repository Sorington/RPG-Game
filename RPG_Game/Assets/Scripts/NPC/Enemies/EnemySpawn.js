#pragma strict

var enemy : GameObject;
var radius : float = 5.0f;
var maxDistanceToSpawn : float = 15.0f;
var respawnTime : float = 30.0f;

private var alive : boolean = false;
private var cooldown : float = 0.0f;

function Start()
{
	Spawn();
}

function Update()
{
	if (alive) return;
	
	cooldown += Time.deltaTime;
	if (cooldown >= respawnTime)
	{
		cooldown = 0.0f;
		Spawn();
	}
}

function Spawn()
{
	var aux : GameObject = Instantiate(enemy, transform.position, transform.rotation);
	alive = true;
	aux.GetComponent(EnemyConfig).spawnPoint = this;
}