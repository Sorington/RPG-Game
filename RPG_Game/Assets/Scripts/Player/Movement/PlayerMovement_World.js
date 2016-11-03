#pragma strict

private var controller : CharacterController;
private var anim : Animator;
private var cameraTransform : Transform;
private var cameraY : Transform;

private var moveDirection : Vector3;
private var playerRotation : Quaternion;

private var gravity : float;
private var movementSpeed : float;

private var turnSmoothing : float = 15.0f;

function Start()
{
	controller = GetComponent(CharacterController);
	anim = GetComponent(Animator);
	
	cameraTransform = GameObject.Find("PlayerCamera").GetComponent(Transform);
	cameraY = GameObject.Find("YCameraRotation").GetComponent(Transform);
	
	moveDirection = Vector3.zero;
	playerRotation = transform.rotation;
	
	gravity = 6.0f;
}

function Update()
{
	if (!GlobalInfo.Instance().inWorld && !GlobalInfo.Instance().inZone) return;
	
	// Settings
	movementSpeed = GlobalInfo.Instance().movementSpeed_World;
	
	// Input
	var vertical : float = Input.GetAxis("Vertical");
	var horizontal : float = Input.GetAxis("Horizontal");
	
	// Movement
	if (vertical != 0 || horizontal != 0)
	{
		anim.SetBool("Running", true);
		var aux : float = moveDirection.y;
		moveDirection = Vector3(horizontal, 0, vertical).normalized;
		moveDirection = cameraY.TransformDirection(moveDirection);
		moveDirection *= movementSpeed*Time.deltaTime;
		moveDirection.y = aux;
		
		// Rotation
		Rotating(moveDirection.x, moveDirection.z);
		/*
		playerRotation = Quaternion.LookRotation(Vector3(moveDirection.x, 0, moveDirection.z).normalized, Vector3.up);
		transform.rotation = Quaternion.Slerp(transform.rotation, playerRotation, 0.5);*/
	}
	else
	{
		anim.SetBool("Running", false);/*
		if (moveDirection.x != 0 || moveDirection.z != 0)
		{
			playerRotation = Quaternion.LookRotation(Vector3(moveDirection.x, 0, moveDirection.z).normalized, Vector3.up);
			playerRotation.eulerAngles.y+=135.0f;
			if (playerRotation.eulerAngles.y >= 360.0f) playerRotation.eulerAngles.y -= 360.0f;
			transform.rotation = Quaternion.Slerp(transform.rotation, playerRotation, 0.5);
		}*/
		moveDirection.x = 0;
		moveDirection.z = 0;
	}
	
	// Gravity
	moveDirection.y -= gravity*Time.deltaTime;
	
	controller.Move(moveDirection);
}

function Rotating(horizontal : float, vertical : float)
{
    var targetDirection : Vector3 = new Vector3(horizontal, 0f, vertical);
    var targetRotation : Quaternion = Quaternion.LookRotation(targetDirection, Vector3.up);
    var newRotation : Quaternion = Quaternion.Lerp(transform.rotation, targetRotation, turnSmoothing * Time.deltaTime);
    transform.rotation = newRotation;
}
